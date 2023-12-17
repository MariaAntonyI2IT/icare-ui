import {
  FETCH_CONTRIBUTOR_COMPLETED_REQUEST,
  FETCH_CONTRIBUTOR_CURRENT_REQUEST,
  FETCH_CONTRIBUTOR_SEARCH_REQUEST,
  FETCH_ORGANIZATION_COMPLETED_REQUEST,
  FETCH_ORGANIZATION_CURRENT_REQUEST
} from './actionTypes';

export const fetchOrganizationCurrentRequest = (payload,successCb,failureCb) => ({
  type: FETCH_ORGANIZATION_CURRENT_REQUEST,
  payload,
  successCb,
  failureCb
});

export const fetchOrganizationCompletedRequest = (payload,successCb,failureCb) => ({
  type: FETCH_ORGANIZATION_COMPLETED_REQUEST,
  payload,
  successCb,
  failureCb
});

export const fetchContributorSearchRequest = (payload,successCb,failureCb) => ({
  type: FETCH_CONTRIBUTOR_SEARCH_REQUEST,
  payload,
  successCb,
  failureCb
});

export const fetchContributorCurrentRequest = (payload,successCb,failureCb) => ({
  type: FETCH_CONTRIBUTOR_CURRENT_REQUEST,
  payload,
  successCb,
  failureCb
});

export const fetchContributorCompletedRequest = (payload,successCb,failureCb) => ({
  type: FETCH_CONTRIBUTOR_COMPLETED_REQUEST,
  payload,
  successCb,
  failureCb
});
