'use client'
import {
  ColumnDirective, ColumnsDirective, GridComponent,
  Inject, Page, Sort, Filter, Group
} from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import React, { useState, useEffect } from 'react';

interface ServerProps {
  httpPort: number;
}

export default function Home() {
  const data = new DataManager({
    url: '/api/getServerList',
    adaptor: new UrlAdaptor(),
    crossDomain: false
  });

  const [ipAddress, setIpAddress] = useState<string>('');
  const [portStatus, setPortStatus] = useState<{ [key: string]: boolean }>({});
  const [checkedPorts, setCheckedPorts] = useState<Set<number>>(new Set());  // Memoized set for checked ports

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
    if (checkedPorts.has(port)) return; // Skip if port already checked

    setCheckedPorts((prev) => new Set(prev).add(port));  // Add port to checked list

    const status = await isPortOpen(port);
    setPortStatus((prevStatus) => ({ ...prevStatus, [port]: status }));
  };

  const filterSettings: object = { type: 'Excel' };

  const linkTemplate = (props: ServerProps) => {
    const url = `https://acstuff.ru/s/q:race/online/join?ip=${ipAddress}&httpPort=${props.httpPort}`;
    return (
      <a className='gridLink' href={url} target="_blank" rel="">
        {`Link`} 
      </a>
    );
  };

  // Refactor statusTemplate to a functional component
  const StatusTemplate: React.FC<ServerProps> = (props) => {
    const port = props.httpPort;
  
    useEffect(() => {
      if (portStatus[port] === undefined) {
        getPortStatus(port);
      }
    }, [port, portStatus]);

    if (portStatus[port] === undefined) {
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
          filterSettings={filterSettings}
          height={300}
        >
          <ColumnsDirective>
            <ColumnDirective field="name" headerText="Server Name" width="100" />
            <ColumnDirective
              headerText="Status"
              width="50"
              textAlign="Left"
              template={StatusTemplate}
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
  );
}
