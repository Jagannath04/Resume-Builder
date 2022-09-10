import { Container } from "@mui/system";
import React from "react";
import "../Styles/TemplateOneExperienceComponent.css";

const TemplateOneExperienceComponent = (props) => {
  return (
    <Container className="template-one-experience-comp">
      <li className="template-one-experience-comp">
        <h3 className="experience-heading">
          {props.experience.job_title}{" "}
          <span className="experience-org-name">
            {props.experience.organization_name}
          </span>
          <span className="experience-start-end">
            ({props.experience.start_year} - {props.experience.end_year})
          </span>
        </h3>
      </li>
    </Container>
  );
};

export default TemplateOneExperienceComponent;