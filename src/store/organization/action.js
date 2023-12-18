import {
  FETCH_CONTRIBUTOR_COMPLETED_REQUEST,
  FETCH_CONTRIBUTOR_CURRENT_REQUEST,
  FETCH_CONTRIBUTOR_SEARCH_REQUEST,
  FETCH_ORGANIZATION_COMPLETED_REQUEST,
  FETCH_ORGANIZATION_CURRENT_REQUEST,
  ORGANIZATION_CREATE_REQUEST,
  DONATE_CONTRIBUTOR_REQUEST,
  ACKNOWLEDGE_CONTRIBUTOR_REQUEST
} from './actionTypes';

export const createOrganizationRequest = (payload,successCb,failureCb) => ({
  type: ORGANIZATION_CREATE_REQUEST,
  payload,
  successCb,
  failureCb
});

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


export const donateContributorRequest = (payload,successCb,failureCb) => ({
  type: DONATE_CONTRIBUTOR_REQUEST,
  payload,
  successCb,
  failureCb
});

export const acknowledgeContributorRequest = (payload,successCb,failureCb) => ({
  type: ACKNOWLEDGE_CONTRIBUTOR_REQUEST,
  payload,
  successCb,
  failureCb
});
