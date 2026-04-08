'use client'
import {
  ColumnDirective, ColumnsDirective, GridComponent,
  Inject, Page, Sort, Filter, Group
} from '@syncfusion/ej2-react-grids';
import React, { useState, useEffect } from 'react';

interface ServerProps {
  uid: number;
  name: string;
  map: string;
  httpPort: number;
  localip: string;
  isactive: boolean;
}

export default function Servers() {
  const [serverData, setServerData] = useState<ServerProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ipAddress, setIpAddress] = useState<string>('');
  const [portStatus, setPortStatus] = useState<{ [key: string]: boolean }>({});
  const [checkedPorts, setCheckedPorts] = useState<Set<number>>(new Set());

  // Fetch server list and IP address on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [serversResponse, ipResponse] = await Promise.all([
          fetch('/api/getServerList'),
          fetch('/api/getIP')
        ]);

        if (!serversResponse.ok) {
          throw new Error(`Failed to fetch servers: ${serversResponse.statusText}`);
        }

        const servers = await serversResponse.json();
        setServerData(servers);

        if (ipResponse.ok) {
          const ip = await ipResponse.json();
          setIpAddress(ip);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    if (checkedPorts.has(port)) return;

    setCheckedPorts((prev) => new Set(prev).add(port));
    const status = await isPortOpen(port);
    setPortStatus((prevStatus) => ({ ...prevStatus, [port]: status }));
  };

  const filterSettings: object = { type: 'Excel' };

  const linkTemplate = (props: ServerProps) => {
    const url = `https://acstuff.ru/s/q:race/online/join?ip=${ipAddress}&httpPort=${props.httpPort}`;
    return (
      <a className='gridLink' href={url} target="_blank" rel="noopener noreferrer">
        Join
      </a>
    );
  };

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

  if (error) {
    return (
      <div className="grid-container">
        <div className="error-message">
          <h3>Error Loading Servers</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid-container">
        <h2 className="grid-header">Server List</h2>
        {loading ? (
          <div className="loading-message">Loading servers...</div>
        ) : (
          <GridComponent
            dataSource={serverData}
            allowSorting={true}
            allowFiltering={true}
            allowPaging={true}
            pageSettings={{ pageSize: 10 }}
            filterSettings={filterSettings}
            height={"70vh"}
          >
            <ColumnsDirective>
              <ColumnDirective field="name" headerText="Server Name" width="150" />
              <ColumnDirective field="map" headerText="Map Name" width="150" />
              <ColumnDirective
                headerText="Status"
                width="100"
                textAlign="Left"
                template={StatusTemplate}
              />
              <ColumnDirective
                headerText="Join"
                width="80"
                textAlign="Left"
                template={linkTemplate}
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group]} />
          </GridComponent>
        )}
      </div>
    </>
  );
}
