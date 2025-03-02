"use client";

import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { useState, useRef, useEffect } from "react";

interface StatsPanelProps {
  postCount?: number;
}

export default function StatsPanel({ postCount = 0 }: StatsPanelProps) {
  const {
    memoryUsage,
    dataTransferred,
    lastUpdated,
    sessionDuration,
    isUpdating,
    formatBytes,
    refreshMetrics
  } = usePerformanceMonitor(postCount);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isMinimized, setIsMinimized] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Handle mouse down event to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setIsDragging(true);
    }
  };

  // Handle mouse move event for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offsetRef.current.x,
          y: e.clientY - offsetRef.current.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={dragRef}
      className={`fixed z-50 rounded-md shadow-lg overflow-hidden transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: isMinimized ? '200px' : '400px',
        opacity: 0.9
      }}
    >
      <div 
        className="bg-skin-accent text-white p-2 text-xs flex justify-between items-center"
        onMouseDown={handleMouseDown}
      >
        <span className="font-bold">Ouranos Stats</span>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="hover:bg-skin-base/20 p-1 rounded"
          >
            {isMinimized ? '🔽' : '🔼'}
          </button>
          <button 
            onClick={refreshMetrics} 
            className="hover:bg-skin-base/20 p-1 rounded"
            disabled={isUpdating}
          >
            <span className={`${isUpdating ? "animate-spin" : ""}`}>🔄</span>
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="bg-skin-secondary border border-skin-base p-3 text-xs text-skin-base">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <span className="text-skin-accent">📊</span>
              <span>Posts: {postCount}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-skin-accent">💾</span>
              <span>Memory: {memoryUsage ? formatBytes(memoryUsage) : "Calculating..."}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-skin-accent">🔄</span>
              <span>Data: {formatBytes(dataTransferred)}</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-skin-accent">⚙️</span>
              <span>Status: {isUpdating ? "Updating..." : "Idle"}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-skin-accent">⏱️</span>
              <span>Session: {sessionDuration}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span>Updated: {new Date(lastUpdated).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
