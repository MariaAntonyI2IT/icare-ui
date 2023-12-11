import { useLocation } from "react-router-dom";
import RegistrationLayout from "./../../layouts/RegistrationLayout";
import CreateContributorAccount from "./CreateContributorAccount";
import CreateOrgAccount from "./CreateOrgAccount";
import "./index.scss";

export default function CreateAccount() {
  const location = useLocation();
  const createOrganization = !!location.state?.createOrganization;
  return (
    <>
      <RegistrationLayout>
        {createOrganization ? (
          <CreateOrgAccount />
        ) : (
          <CreateContributorAccount />
        )}
      </RegistrationLayout>
    </>
  );
}
