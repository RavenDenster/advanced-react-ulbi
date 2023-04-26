import { Calendar } from 'antd'
import React, {FC} from 'react'
import { IEvent } from '../models/IEvent'
import {Moment} from 'moment'
import { formatDate } from '../utils/data'

interface EventCalendarProps {
  events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = ( props ) => {
  
  function dateCellRender(value: Moment) {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
    return (
      <div>
        {currentDayEvents.map((ev, i) => 
          <div key={i}>{ev.description}</div>
        )}
      </div>
    );
  };

  return (
    //@ts-ignore
    <Calendar dateCellRender={dateCellRender}/>
  )
}

export default EventCalendar
