'use client';

import React, { useState } from 'react';

interface SelectorOption {
  id: string;
  name: string;
}

interface SelectorProps {
  onSelectionChange?: (selections: {
    system: string;
    repos: string[];
    environment: string;
  }) => void;
}


const Selector: React.FC<SelectorProps> = ({ onSelectionChange }) => {
  // Sample data
  const systems: SelectorOption[] = [
    { id: 'alerts and notifications', name: 'Alerts and Notifications' },
    { id: 'billing', name: 'Billing' },
    { id: 'admin', name: 'Admin Portal' },
  ];

  const systemToRepoMap: Record<string, SelectorOption[]> = {
    'alerts and notifications': [
      { id: 'josys-src/alert-service', name: 'Alert Service' },
      { id: 'josys-src/alert-bff', name: 'BFF' },
    ],
    'josys-billing': [
      { id: 'josys-src/billing-API', name: 'API' },
      { id: 'josys-src/billing-worker', name: 'Background Worker' },
    ],
  };

  const environments: SelectorOption[] = [
    { id: 'dev', name: 'Development' },
    { id: 'staging', name: 'Staging' },
    { id: 'prod', name: 'Production' },
  ];

  const [selectedSystem, setSelectedSystem] = useState<string>('');
  const [selectedRepos, setSelectedRepo] = useState<string[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('');

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSystem(e.target.value);
    setSelectedRepo(systemToRepoMap[e.target.value]?.map(repo => repo.id) || []);
    notifyChange(e.target.value, selectedRepos, selectedEnvironment);
  };

  const handleRepoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    var repos: string[] = [];
    if (e.target.value === "") {
        repos  = systemToRepoMap[selectedSystem]?.map(repo => repo.id) || [];
    } else {
        repos =[e.target.value];
    }
    setSelectedRepo(repos);
    notifyChange(selectedSystem, repos, selectedEnvironment);
  };

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEnvironment(e.target.value);
    notifyChange(selectedSystem, selectedRepos, e.target.value);
  };

  const notifyChange = (system: string, repos: string[], environment: string) => {
    if (onSelectionChange) {
      onSelectionChange({ system, repos, environment });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="service-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            System
          </label>
          <select
            id="system-select"
            value={selectedSystem}
            onChange={handleSystemChange}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select a system</option>
            {systems.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="repo-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service
          </label>
          <select
            id="repo-select"
            value={selectedRepos}
            onChange={handleRepoChange}
            multiple={true}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All</option>
            {
              systemToRepoMap[selectedSystem]?.map((repo) => (
                <option key={repo.id} value={repo.id}>{repo.name}</option>
              ))
            }
          </select>
        </div>

        {/* <div>
          <label htmlFor="env-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Environment
          </label>
          <select
            id="env-select"
            value={selectedEnvironment}
            onChange={handleEnvironmentChange}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select an environment</option>
            {environments.map((env) => (
              <option key={env.id} value={env.id}>
                {env.name}
              </option>
            ))}
          </select>
        </div> */}
      </div>
    </div>
  );
};

export default Selector;
