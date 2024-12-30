'use client'
import {
  ColumnDirective, ColumnsDirective, GridComponent,
  Inject, Page, Sort, Filter, Group
} from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const data = new DataManager({
    url: '/api/getServerList',
    adaptor: new UrlAdaptor(),
    crossDomain: false
  });

  const [ipAddress, setIpAddress] = useState<string>('');
  const [portStatus, setPortStatus] = useState<{ [key: string]: boolean }>({});

  // Fetch IP address when the component is mounted
  useEffect(() => {
    const fetchIPData = async () => {
      try {
        const response = await fetch('/api/getIP');
        const data = await response.json();
        setIpAddress(data);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };

    fetchIPData();
  }, []);

  const isPortOpen = async (port: number) => {
    try {
      const response = await fetch(`/api/isPortOpen?port=${port}`);
      const data = await response.json();
      return data === 'true';
    } catch (error) {
      console.error('Error fetching port status:', error);
      return false;
    }
  };

  const getPortStatus = async (port: number) => {
    const status = await isPortOpen(port);
    setPortStatus((prevStatus) => ({ ...prevStatus, [port]: status }));
  };

  //const pageSettings: object = { pageSize: 6 };
  const filterSettings: object = { type: 'Excel' };

  const linkTemplate = (props: any) => {
    const url = `https://acstuff.ru/s/q:race/online/join?ip=${ipAddress}&httpPort=${props.httpPort}`;
    return (
      <a className='gridLink' href={url} target="_blank" rel="">
        {`Link`} 
      </a>
    );
  };

  const statusTemplate = (props: any) => {
    const port = props.httpPort;
  
    if (portStatus[port] === undefined) {
      getPortStatus(port);
      return <span className="status-loading">Loading...</span>;
    }
  
    return portStatus[port] ? (
      <span className="status-online">
        <i className="status-icon status-icon-online"></i> Online
      </span>
    ) : (
      <span className="status-offline">
        <i className="status-icon status-icon-offline"></i> Offline
      </span>
    );
  };
  

  return (
    <>
      <h2>Syncfusion React Grid Component</h2>
      <div className="grid-container">
        <GridComponent
          dataSource={data}
          allowSorting={true}
          allowFiltering={true}
          allowPaging={true}
          //pageSettings={pageSettings}
          filterSettings={filterSettings}
          height={180}
        >
          <ColumnsDirective>
            <ColumnDirective field="name" headerText="Server Name" width="100" />
            <ColumnDirective
              headerText="Status"
              width="50"
              textAlign="Left"
              template={statusTemplate}
            />
            <ColumnDirective
              headerText="Link"
              width="100"
              textAlign="Left"
              template={linkTemplate}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group]} />
        </GridComponent>
      </div>
    </>
  )
}