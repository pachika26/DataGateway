export type DataClassification = 'public' | 'internal' | 'sensitive' | 'highly-sensitive';

export interface Dataset {
  id: string;
  name: string;
  description: string;
  owner: string;
  project: string;
  dataset: string;
  table: string;
  classification: DataClassification;
  lastRefresh: string;
  rowCount: number;
  columns: Column[];
}

export interface Column {
  name: string;
  type: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  pinnedDatasetIds: string[];
  createdAt: string;
}

export interface PipelineTask {
  id: string;
  name: string;
  type: 'extract' | 'transform' | 'load' | 'python' | 'sql';
  status: 'draft' | 'validating' | 'valid' | 'error';
  code?: string;
}

export interface Pipeline {
  id: string;
  name: string;
  projectId: string;
  tasks: PipelineTask[];
  status: 'draft' | 'in_review' | 'production' | 'failed';
  estimatedCost: number;
  lastRun?: string;
}

export interface AccessRequest {
  id: string;
  datasetId: string;
  requester: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  expectedResponse: string;
}
