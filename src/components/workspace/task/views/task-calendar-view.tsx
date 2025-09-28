/**
 * Task Calendar View Component
 * Displays tasks in a calendar format with drag-and-drop support
 */

import { FC, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/types/api.type";
import { priorities } from "../table/data";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskCalendarViewProps {
  tasks: TaskType[];
  isLoading: boolean;
  onTaskClick?: (task: TaskType) => void;
  onDateClick?: (date: Date) => void;
}

interface CalendarTaskProps {
  task: TaskType;
  onClick?: (task: TaskType) => void;
}

interface CalendarDayProps {
  date: Date;
  tasks: TaskType[];
  onTaskClick?: (task: TaskType) => void;
  onDateClick?: (date: Date) => void;
}

const CalendarTask: FC<CalendarTaskProps> = ({ task, onClick }) => {
  const priority = priorities.find(p => p.value === task.priority);
  const PriorityIcon = priority?.icon;
  
  const assignee = task.assignedTo;
  const name = assignee?.name || "";
  const initials = getAvatarFallbackText(name);
  const avatarColor = getAvatarColor(name);

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-200 text-green-800';
      default: return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  return (
    <div
      className={`p-2 mb-1 rounded border cursor-pointer hover:shadow-sm transition-all text-xs ${getPriorityColor(task.priority)}`}
      onClick={() => onClick?.(task)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium truncate flex-1">{task.title}</span>
        {PriorityIcon && <PriorityIcon className="h-3 w-3 ml-1" />}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {task.project && (
            <span className="text-[10px] opacity-75">
              {task.project.emoji} {task.project.name}
            </span>
          )}
        </div>
        
        {assignee && (
          <Avatar className="h-4 w-4">
            <AvatarImage src={assignee.profilePicture || ""} alt={name} />
            <AvatarFallback className={`${avatarColor} text-[8px]`}>
              {initials}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

const CalendarDay: FC<CalendarDayProps> = ({ date, tasks, onTaskClick, onDateClick }) => {
  const dayTasks = tasks.filter(task => 
    task.dueDate && isSameDay(new Date(task.dueDate), date)
  );

  const isToday = isSameDay(date, new Date());
  const isPast = date < new Date() && !isToday;

  return (
    <div 
      className={`min-h-[120px] p-1 border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer ${
        isToday ? 'bg-blue-50 border-blue-200' : ''
      } ${isPast ? 'bg-gray-50' : ''}`}
      onClick={() => onDateClick?.(date)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : isPast ? 'text-gray-400' : 'text-gray-900'}`}>
          {format(date, 'd')}
        </span>
        {dayTasks.length > 0 && (
          <Badge variant="secondary" className="text-xs h-4 px-1">
            {dayTasks.length}
          </Badge>
        )}
      </div>
      
      <div className="space-y-1">
        {dayTasks.slice(0, 3).map((task) => (
          <CalendarTask
            key={task._id}
            task={task}
            onClick={onTaskClick}
          />
        ))}
        
        {dayTasks.length > 3 && (
          <div className="text-xs text-gray-500 text-center py-1">
            +{dayTasks.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

export const TaskCalendarView: FC<TaskCalendarViewProps> = ({
  tasks,
  isLoading,
  onTaskClick,
  onDateClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const tasksByDate = useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (task.dueDate) {
        const dateKey = format(new Date(task.dueDate), 'yyyy-MM-dd');
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(task);
      }
      return acc;
    }, {} as Record<string, TaskType[]>);
  }, [tasks]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 42 }).map((_, index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {format(currentDate, 'MMMM yyyy')}
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleToday}
              className="h-8"
            >
              Today
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date) => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const dayTasks = tasksByDate[dateKey] || [];
            
            return (
              <CalendarDay
                key={dateKey}
                date={date}
                tasks={dayTasks}
                onTaskClick={onTaskClick}
                onDateClick={onDateClick}
              />
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
            <span>Low Priority</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};