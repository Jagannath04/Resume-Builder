import { Button, CircularProgress, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import "../Styles/PreviewComponent.css";
import { connect } from "react-redux";
import { templates } from "../Data/templates";
import JsPDF from "jspdf";

const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplateReducer.selectedTemplateId,
  personalInfo: state.personalInfoReducer.personalInfo,
  experiences: state.workExperienceReducer.experiences,
  educationInfo: state.educationDetailsReducer.educationInfo,
  skills: state.keySkillsReducer.skills,
});

const mapDispatchToProps = (dispatch) => ({});

const PreviewComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [error, setError] = useState("");

  const getTemplate = (template, index) => {
    if (template.id === props.selectedTemplateId) {
      const TemplateComp = React.cloneElement(template.template, {
        personalinfo: props.personalInfo,
        workexperience: props.experiences,
        educationinfo: props.educationInfo,
        skills: props.skills,
        key: index,
      });
      return TemplateComp;
    }
  };

  console.log(props.initialPersonalInfoState);

  const handleSave = () => {
    if (resumeName.length === 0) {
      setError("*Please fill this field");
    } else {
      setError("");
      setLoading(true);
      const report = new JsPDF("portrait", "pt", "a4");
      report.html(document.querySelector("#report")).then(() => {
        report.save(`${resumeName}.pdf`);
        setLoading(false);
        //Saving the user data in localstorage
        let resumes = window.localStorage.getItem("resumes");
        console.log(resumes);
        if (resumes) {
          let newResumes = JSON.parse(resumes);

          newResumes.push({
            id: props.selectedTemplateId,
            personalInfo: props.personalInfo,
            experiences: props.experiences,
            educationInfo: props.educationInfo,
            skills: props.skills,
          });

          window.localStorage.setItem("resumes", JSON.stringify(newResumes));
        } else {
          window.localStorage.setItem(
            "resumes",
            JSON.stringify([
              {
                id: props.selectedTemplateId,
                personalInfo: props.personalInfo,
                experiences: props.experiences,
                educationInfo: props.educationInfo,
                skills: props.skills,
              },
            ])
          );
        }

        //Redirect user to the myResumes page
        window.location.reload();
      });
    }
  };

  const handleBack = () => {
    props.setTab(props.tab - 1);
  };

  return (
    <Container sx={{ padding: "60px 80px" }} className="preview-container">
      <h2 className="preview-header-title">Resume Preview</h2>
      <div className="resume-preview-grid-container">
        <div className="resume-preview-grid-item">
          {templates.map((template, index) => {
            return getTemplate(template, index);
          })}
        </div>
        <div className="resume-preview-grid-item">
          <div className="resume-save-container">
            <h3 className="resume-save-title">Create File Name</h3>
            <TextField
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              className="resume-name-field"
              id="outlined-basic"
              variant="outlined"
              error={error.length > 0 ? true : false}
              helperText={error}
            />
            <div className="resume-back-next-container">
              <Button
                onClick={handleBack}
                className="outlined-btn"
                sx={{ marginRight: "20px" }}
                variant="outlined">
                Back
              </Button>
              {loading ? (
                <CircularProgress size={25} />
              ) : (
                <Button
                  onClick={handleSave}
                  className="contained-btn"
                  variant="contained">
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewComponent);
