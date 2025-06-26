'use client';

import React, { useState } from 'react';

export type DeploymentStatus = 'pending-approval' | 'in-progress' | 'completed' | 'failed' | 'testing';

export interface DeploymentEvents {
  deploymentId: string; // Unique identifier for the event
  repo: string;
  environment: string; // Optional environment for the deployment
  timestamp: Date; // Timestamp of the event
  status: DeploymentStatus; // Status of the deployment event
  message?: string; // Optional message or description of the event
  approvalUrl?: string; // Optional URL for approval (if pending)
}

export interface Deployment {
  repo: string;
  version: string;
  environment: string;
  status: DeploymentStatus;
  deployedBy: string;
  timestamp: Date; // Timestamp of the last deployment event
  startedTimestamp: Date; // Timestamp when the deployment started
  deploymentId: string; // Unique identifier for the deployment
  approvalUrl?: string; // Optional URL for approval (if pending)
}

export const useDeploymentEvents = () => {
  const [events, setEvents] = React.useState<DeploymentEvents[]>([
    {
      deploymentId: 'josys-src/alert-service/deployments/1',
      timestamp: new Date('2023-10-01T13:00:00Z'),
      repo: 'josys-src/alert-service',
      environment: 'staging',
      status: 'pending-approval',
      message: 'Deployment pending approval by John Doe',
      approvalUrl: 'https://github.com/josys-src/alert-service/issues/1',
    },
    {
      deploymentId: 'josys-src/alert-service/deployments/2',
      timestamp: new Date('2023-10-01T14:00:00Z'),
      repo: 'josys-src/alert-service',
      environment: 'production',
      status: 'completed',
      message: 'Deployment completed successfully by John Doe',
    },
  ]);
  return { events, setEvents };
}

export interface VersionDeploymentHistory {
  repo: string;
  version: string;
  history: string[]; // ref to DeploymentState by environment
}

export const useVersionDeploymentHistory = () => {
  const [versionHistory, setVersionHistory] = React.useState<VersionDeploymentHistory[]>([
    {
      repo: 'josys-src/alert-service',
      version: '1.1.0',
      history: ["staging", "development"]
    },
    {
      repo: 'josys-src/alert-service',
      version: '1.2.0',
      history: ["development"]
    },
  ]);
  return { versionHistory, setVersionHistory };
}

export const useDeploymentState = () => {
  // Note: this is mock data organized by repo, and environment
  // This data is ordered by the environment, so the user sees 
  const [deployments, setDeployments] = React.useState<Deployment[]>([
    {
      repo: 'josys-src/alert-service',
      environment: 'staging',
      version: '1.1.0',
      status: 'pending-approval',
      deployedBy: 'John Doe',
      timestamp: new Date('2023-10-01T13:00:00Z'),
      startedTimestamp: new Date('2023-10-01T12:00:00Z'),
      deploymentId: 'josys-src/alert-service/deployments/1',
      approvalUrl: 'https://github.com/josys-src/alert-service/issues/1',
    },
    {
      repo: 'josys-src/alert-service',
      environment: 'development',
      version: '1.1.0',
      status: 'completed',
      deployedBy: 'John Doe',
      timestamp: new Date('2023-10-01T13:00:00Z'),
      startedTimestamp: new Date('2023-10-01T12:00:00Z'),
      deploymentId: 'josys-src/alert-service/deployments/2',
    },
    {
      repo: 'josys-src/alert-service',
      environment: 'development',
      version: '1.2.0',
      status: 'completed',
      deployedBy: 'John Doe',
      timestamp: new Date('2023-10-01T13:00:00Z'),
      startedTimestamp: new Date('2023-10-01T12:00:00Z'),
      deploymentId: 'josys-src/alert-service/deployments/3',
    },
  ]);

  return { deployments, setDeployments };
}

const StatusBadge: React.FC<{ status: DeploymentStatus }> = ({ status }) => {
  const badgeClasses: Record<DeploymentStatus, string> = {
    'pending-approval': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'completed': 'bg-green-100 text-green-800 border-green-200',
    'failed': 'bg-red-100 text-red-800 border-red-200',
    'testing': 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${badgeClasses[status]}`}>
      {status.replace('-', ' ')}
    </span>
  );
};

export interface DeploymentTableProps {
  repos?: string[];
  environment?: string;
}

const DeploymentEventsList: React.FC<{ deploymentId: string }> = ({ deploymentId }) => {
  const { events } = useDeploymentEvents();
  const deploymentEvents = events.filter(event => event.deploymentId === deploymentId);
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  if (deploymentEvents.length === 0) {
    return <div className="p-4 text-gray-500">No events found for this deployment.</div>;
  }

  return (
    <div className="mt-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md p-4">
      <h3 className="text-sm font-medium mb-2">Deployment Events</h3>
      <table className="w-full text-xs">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Timestamp</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          {deploymentEvents.map((event, index) => (
            <tr key={index} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{formatDate(event.timestamp)}</td>
              <td className="px-4 py-2">
                <StatusBadge status={event.status} />
              </td>
              <td className="px-4 py-2">{event.message || 'No message'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const DeploymentTable: React.FC<DeploymentTableProps> = ({ repos, environment }) => {
  const { deployments } = useDeploymentState();
  const [deploymentIdWithDetails, setShowDeploymentDetails] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Filter deployments based on selected repos and environment
  const filteredDeployments = deployments.filter(deployment => {
    const repoMatch = !repos || repos.length === 0 || repos.includes(deployment.repo);
    const envMatch = !environment || environment === '' || deployment.environment === environment;
    
    return repoMatch && envMatch;
  });

  const toggleDeploymentDetails = (deploymentId: string) => {
    if (deploymentIdWithDetails === deploymentId) {
      setShowDeploymentDetails(null); // Collapse if already expanded
    } else {
      setShowDeploymentDetails(deploymentId); // Expand the clicked deployment
    }
  };

  const getPromoEnv = (deployment: Deployment) => {
    // Returns true if the environment is a production-like environment
    for (const historyState of useVersionDeploymentHistory().versionHistory) {
      if (historyState.version === deployment.version && historyState.repo === deployment.repo) {
        const lastEnv = historyState.history[historyState.history.length - 1];
        if (lastEnv === 'development') {
          return "staging";
        } else if (lastEnv === 'staging') {
          return "production";
        }
        else if (lastEnv === 'production') {
          return "production-us";
        }
      }
    }
    return '';
  }

  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <h2 className="text-sm font-medium mb-2">
      Environment Deployment Status
      </h2>
      <table className="w-full text-sm text-left">
        <thead className="text-xs bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase">
          <tr>
            <th className="px-6 py-3">Repo</th>
            <th className="px-6 py-3">Environment</th>
            <th className="px-6 py-3">Deployed Version</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date/Time</th>
            <th className="px-6 py-3">By</th>
            <th className="px-6 py-3">Actions</th>
            <th className="px-6 py-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeployments.map((deployment) => (
            <React.Fragment key={deployment.deploymentId}>
              <tr 
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4">{deployment.repo}</td>
                <td className="px-6 py-4">{deployment.environment}</td>
                <td className="px-6 py-4">
                  <div className="font-medium">{deployment.version}</div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={deployment.status} />
                </td>
                <td className="px-6 py-4">
                  {formatDate(deployment.timestamp)}
                </td>
                <td className="px-6 py-4">{deployment.deployedBy}</td>
                <td className="px-6 py-4">
                  {deployment.approvalUrl && (
                    <a 
                      href={deployment.approvalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-2"
                    >
                      Approve
                    </a>
                  )}
                  { deployment.status === 'completed' && getPromoEnv(deployment) && (
                    <div className="inline-block relative">
                    <button 
                    onClick={() => alert("RUNNING PROMOTE")}
                    data-tooltip-target={"tt" + deployment.deploymentId}
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Promote
                    </button>
                    <div id={"tt" + deployment.deploymentId} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                        Promote this deployment to {getPromoEnv(deployment)} environment  
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleDeploymentDetails(deployment.deploymentId)} 
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                  {
                    deploymentIdWithDetails === deployment.deploymentId && (
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                      </svg>
                    )
                  }
                  {
                    deploymentIdWithDetails != deployment.deploymentId && (
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                      </svg>
                    )
                  }
                  </button>
                </td>
              </tr>
              {deploymentIdWithDetails === deployment.deploymentId && (
                <tr>
                  <td colSpan={7} className="px-6 py-2 bg-gray-50 dark:bg-gray-900">
                    <DeploymentEventsList deploymentId={deployment.deploymentId} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeploymentTable;