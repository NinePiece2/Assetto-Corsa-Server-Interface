'use client'
import {
  ColumnDirective, ColumnsDirective, GridComponent,
  Inject, Page, Sort, Filter, Group
} from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

interface LeaderboardProps {
    date: number;
    duration: string;
  }

  const formatDate = (props: LeaderboardProps) => {
    const formattedDate = new Date(props.date);
  
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Toronto',
    });
  
    const formattedDateString = dateFormatter.format(formattedDate);
    return `${formattedDateString} EST`
  };

  const formatDuration = (props: LeaderboardProps) => {
    const [hours, minutes, seconds] = props.duration.split(':').map(Number);
    const formattedMinutes = hours > 0 ? `${hours * 60 + minutes}m` : `${minutes}m`;
    const formattedSeconds = seconds < 10 ? `${seconds}s` : `${seconds}s`;
    return `${formattedMinutes} ${formattedSeconds}`;
  };
  

export default function Home() {
  const data = new DataManager({
    url: '/api/getLeaderboard',
    adaptor: new UrlAdaptor(),
    crossDomain: false
  });
  
  const filterSettings: object = {
    type: 'Excel',
    mode: 'Immediate',
    hierarchyMode: 'Parent',
  };

  return (
    <>
      <div className="grid-container">
        <h2 className="grid-header">Shutoko Leaderboard</h2>
        <GridComponent
          dataSource={data}
          allowSorting={false}
          allowFiltering={false}
          allowPaging={true}
          filterSettings={filterSettings}
          height={"70vh"}
        >
          <ColumnsDirective>
            <ColumnDirective field="rank" isPrimaryKey={true} headerText="Rank" width="50" textAlign="Left" />
            <ColumnDirective field="name" headerText="Name" width="75" textAlign="Left" />
            <ColumnDirective field="date" headerText="Date" width="75" textAlign="Left" template={formatDate}/>
            <ColumnDirective field="car" headerText="Car" width="120" textAlign="Left" />
            <ColumnDirective field="duration" headerText="Duration" width="70" textAlign="Left" template={formatDuration}/>
            <ColumnDirective field="scorePerMinute" headerText="Score Per Minute" width="75" textAlign="Left" />
            <ColumnDirective field="score" headerText="Score" width="75" textAlign="Left" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group]} />
        </GridComponent>
      </div>
    </>
  )
}