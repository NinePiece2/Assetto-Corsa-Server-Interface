'use client'
import {
  ColumnDirective, ColumnsDirective, GridComponent,
  Inject, Page, Sort, Filter, Group
} from '@syncfusion/ej2-react-grids';
import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  date: string;
  car: string;
  duration: string;
  scorePerMinute: number;
  score: number;
}

const formatDate = (props: LeaderboardEntry) => {
  try {
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
    return `${formattedDateString} EST`;
  } catch {
    return props.date;
  }
};

const formatDuration = (props: LeaderboardEntry) => {
  try {
    const [hours, minutes, seconds] = props.duration.split(':').map(Number);
    const formattedMinutes = hours > 0 ? `${hours * 60 + minutes}m` : `${minutes}m`;
    const formattedSeconds = seconds < 10 ? `0${seconds}s` : `${seconds}s`;
    return `${formattedMinutes} ${formattedSeconds}`;
  } catch {
    return props.duration;
  }
};

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/getLeaderboard');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Extract result array from API response
        const entries = data.result || [];
        setLeaderboardData(entries);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);
  
  const filterSettings: object = {
    type: 'Excel',
    mode: 'Immediate',
    hierarchyMode: 'Parent',
  };

  if (error) {
    return (
      <div className="grid-container">
        <div className="error-message">
          <h3>Error Loading Leaderboard</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid-container">
        <h2 className="grid-header">Shutoko Leaderboard</h2>
        {loading ? (
          <div className="loading-message">Loading leaderboard...</div>
        ) : (
          <GridComponent
            dataSource={leaderboardData}
            allowSorting={true}
            allowFiltering={true}
            allowPaging={true}
            pageSettings={{ pageSize: 20 }}
            filterSettings={filterSettings}
            height={"70vh"}
          >
            <ColumnsDirective>
              <ColumnDirective field="rank" headerText="Rank" width="75" textAlign="Center" />
              <ColumnDirective field="name" headerText="Name" width="100" textAlign="Left" />
              <ColumnDirective field="date" headerText="Date" width="180" textAlign="Left" template={formatDate} />
              <ColumnDirective field="car" headerText="Car" width="120" textAlign="Left" />
              <ColumnDirective field="duration" headerText="Duration" width="100" textAlign="Center" template={formatDuration} />
              <ColumnDirective field="scorePerMinute" headerText="Score/Min" width="100" textAlign="Right" />
              <ColumnDirective field="score" headerText="Score" width="100" textAlign="Right" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group]} />
          </GridComponent>
        )}
      </div>
    </>
  );
}