import { Dataset, Project, AccessRequest, Pipeline } from './types';

export const MOCK_DATASETS: Dataset[] = [
  {
    id: 'ds-1',
    name: 'customer_transactions',
    description: 'Historical transaction records for all customers including store and online purchases.',
    owner: 'Retail Analytics Team',
    project: 'ecommerce-prod',
    dataset: 'customers',
    table: 'transactions',
    classification: 'sensitive',
    lastRefresh: '2024-02-23',
    rowCount: 981351,
    columns: [
      { name: 'customer_id', type: 'STRING', description: 'Unique identifier for the customer' },
      { name: 'transaction_date', type: 'DATE', description: 'Date of purchase' },
      { name: 'amount', type: 'FLOAT', description: 'Total transaction amount' },
      { name: 'store_id', type: 'STRING', description: 'Identifier for the physical or digital store' },
      { name: 'product_category', type: 'STRING', description: 'Broad category of the item' }
    ]
  },
  {
    id: 'ds-2',
    name: 'marketing_campaigns',
    description: 'Campaign metadata including start/end dates, budgets, and target segments.',
    owner: 'Marketing Ops',
    project: 'marketing-prod',
    dataset: 'campaigns',
    table: 'metadata',
    classification: 'internal',
    lastRefresh: '2024-02-24',
    rowCount: 12450,
    columns: [
      { name: 'campaign_id', type: 'STRING' },
      { name: 'campaign_name', type: 'STRING' },
      { name: 'start_date', type: 'DATE' },
      { name: 'end_date', type: 'DATE' },
      { name: 'budget', type: 'FLOAT' }
    ]
  },
  {
    id: 'ds-3',
    name: 'ad_spend_daily',
    description: 'Daily advertising expenditure broken down by channel and campaign.',
    owner: 'AdTech Engineering',
    project: 'adtech-prod',
    dataset: 'spend',
    table: 'daily_fact',
    classification: 'sensitive',
    lastRefresh: '2024-02-24',
    rowCount: 5420000,
    columns: [
      { name: 'date', type: 'DATE' },
      { name: 'campaign_id', type: 'STRING' },
      { name: 'spend_amount', type: 'FLOAT' },
      { name: 'impressions', type: 'INTEGER' }
    ]
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-mram',
    name: 'MRAM',
    description: 'Marketing Revenue Attribution Model - combining spend and sales data.',
    pinnedDatasetIds: ['ds-1', 'ds-2', 'ds-3'],
    createdAt: '2024-01-15'
  },
  {
    id: 'proj-demo',
    name: 'Customer Retention',
    description: 'Analyzing churn patterns for high-value segments.',
    pinnedDatasetIds: ['ds-1'],
    createdAt: '2024-02-10'
  }
];

export const MOCK_PIPELINES: Pipeline[] = [
  {
    id: 'pipe-1',
    name: 'Customer Data Pipeline',
    projectId: 'proj-demo',
    tasks: [],
    status: 'production',
    estimatedCost: 12.50,
    lastRun: '2 hours ago'
  },
  {
    id: 'pipe-2',
    name: 'Sales Analytics ETL',
    projectId: 'proj-mram',
    tasks: [],
    status: 'draft',
    estimatedCost: 45.00,
    lastRun: 'Just now'
  }
];

export const MOCK_ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: 'req-1',
    datasetId: 'ds-1',
    requester: 'Asheesh Patel',
    status: 'pending',
    submittedAt: '2025-01-08',
    expectedResponse: '2025-01-15'
  },
  {
    id: 'req-2',
    datasetId: 'ds-3',
    requester: 'Asheesh Patel',
    status: 'under_review',
    submittedAt: '2025-01-07',
    expectedResponse: '2025-01-14'
  }
];
