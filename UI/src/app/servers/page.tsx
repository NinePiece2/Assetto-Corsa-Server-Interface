'use client'
import {
  ColumnDirective, ColumnsDirective, GridComponent,
  Inject, Page, Sort, Filter, Group
} from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";


export default function Home() {
  const data = new DataManager({
    url: '/api/getServerList',
    adaptor: new UrlAdaptor(),
    crossDomain: false
  });

  //const pageSettings: object = { pageSize: 6 };
  const filterSettings: object = { type: 'Excel' };
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
            <ColumnDirective field="uid" isPrimaryKey={true} headerText="ID" width="100" textAlign="Right" />
            <ColumnDirective field="name" headerText="Server Name" width="200" />
            <ColumnDirective field="localIP" headerText="Local IP" width="150" />
            <ColumnDirective field="httpPort" headerText="HTTP Port" width="100" textAlign="Right" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group]} />
        </GridComponent>
      </div>
    </>
  )
}