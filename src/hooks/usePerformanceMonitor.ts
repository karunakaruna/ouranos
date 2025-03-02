"use client";

import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  memoryUsage: number | null;
  dataTransferred: number;
  lastUpdated: Date;
  sessionStart: Date;
  sessionDuration: string;
  isUpdating: boolean;
}

export function usePerformanceMonitor(postCount: number = 0): PerformanceMetrics & {
  formatBytes: (bytes: number) => string;
  refreshMetrics: () => void;
} {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    memoryUsage: null,
    dataTransferred: 0,
    lastUpdated: new Date(),
    sessionStart: new Date(),
    sessionDuration: '0 seconds',
    isUpdating: false
  });

  // Format bytes to human readable format
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Calculate session duration
  const calculateSessionDuration = (start: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    
    if (diffSec < 60) return `${diffSec} seconds`;
    
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min ${diffSec % 60} sec`;
    
    const diffHour = Math.floor(diffMin / 60);
    return `${diffHour} hr ${diffMin % 60} min`;
  };

  // Simulate memory usage calculation
  const calculateMemoryUsage = (posts: number): number => {
    // This is a simulation - in a real app you'd use performance.memory if available
    const estimatedMemoryPerPost = 50 * 1024; // 50KB per post (example)
    const baseMemory = 5 * 1024 * 1024; // 5MB base memory usage
    return baseMemory + (posts * estimatedMemoryPerPost);
  };

  // Simulate data transfer calculation
  const calculateDataTransferred = (current: number): number => {
    // Simulate some additional data transfer each time
    const additionalData = Math.random() * 50000; // Random amount up to ~50KB
    return current + additionalData;
  };

  // Update metrics
  const updateMetrics = () => {
    setMetrics(prev => ({
      ...prev,
      memoryUsage: calculateMemoryUsage(postCount),
      dataTransferred: calculateDataTransferred(prev.dataTransferred),
      sessionDuration: calculateSessionDuration(prev.sessionStart),
      lastUpdated: new Date()
    }));
  };

  // Refresh metrics manually
  const refreshMetrics = () => {
    setMetrics(prev => ({ ...prev, isUpdating: true }));
    
    // Simulate update process
    setTimeout(() => {
      updateMetrics();
      setMetrics(prev => ({ ...prev, isUpdating: false }));
    }, 800);
  };

  // Update metrics periodically
  useEffect(() => {
    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, [postCount]);

  // Update session duration more frequently
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        sessionDuration: calculateSessionDuration(prev.sessionStart)
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    ...metrics,
    formatBytes,
    refreshMetrics
  };
}
