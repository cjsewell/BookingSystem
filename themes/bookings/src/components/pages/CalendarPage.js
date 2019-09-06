import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

function CalendarPage() {
    return (
        <div className="custom-container">
            <Calendar
                localizer={localizer}
                events={[
                    {
                      'title': 'My event',
                      'allDay': false,
                      'start': new Date(2019, 0, 1, 10, 0), // 10.00 AM
                      'end': new Date(2019, 0, 1, 14, 0), // 2.00 PM 
                    }
                  ]}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    )
}

export default CalendarPage;