import * as actionTypes from "./actionTypes";

const initialSelectedTemplateState = {
  selectedTemplateId: null,
};

const initialPersonalInfoState = {
  profile_img: "",
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
  address: "",
  city: "",
  state_name: "",
  postal_code: "",
  objective: "",
};

const initialWorkExperienceState = {
  experiences: [
    {
      id: 1,
      job_title: "",
      organization_name: "",
      start_year: "",
      end_year: "",
    },
  ],
};

const initialEducationState = {
  domain: "",
  university: "",
  degree: "",
  start_year: "",
  end_year: "",
};

const initialSkillsState = {
  skills: ["", "", ""],
};

export const selectedTemplateReducer = (
  state = initialSelectedTemplateState,
  action
) => {
  switch (action.type) {
    case actionTypes.SELECTTEMPLATE:
      return { ...state, selectedTemplateId: action.payload };
    default:
      return state;
  }
};

export const personalInfoReducer = (
  state = initialPersonalInfoState,
  action
) => {
  switch (action.type) {
    case actionTypes.EDITFIRSTNAME:
      return {
        ...state,
        first_name: action.payload,
      };
    case actionTypes.EDITLASTNAME:
      return {
        ...state,
        last_name: action.payload,
      };
    case actionTypes.EDITEMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case actionTypes.EDITMOBILE:
      return {
        ...state,
        mobile: action.payload,
      };
    case actionTypes.EDITADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case actionTypes.EDITCITY:
      return {
        ...state,
        city: action.payload,
      };
    case actionTypes.EDITSTATE:
      return {
        ...state,
        state_name: action.payload,
      };
    case actionTypes.EDITPOSTALCODE:
      return {
        ...state,
        postal_code: action.payload,
      };
    case actionTypes.EDITOBJECTIVE:
      return {
        ...state,
        objective: action.payload,
      };
    default:
      return state;
  }
};

export const workExperienceReducer = (
  state = initialWorkExperienceState,
  action
) => {
  switch (action.type) {
    case actionTypes.ADDEXPERIENCE:
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
      };
    case actionTypes.ADDALLEXPERIENCE:
      return {
        ...state,
        experiences: action.payload,
      };
    case actionTypes.EDITJOBTITLE:
      return {
        ...state,
        experiences: state.experiences.map((experience) => {
          if (experience.id === action.payload.id) {
            return { ...experience, job_title: action.payload.job_title };
          } else {
            return experience;
          }
        }),
      };
    case actionTypes.EDITORGNAME:
      return {
        ...state,
        experiences: state.experiences.map((experience) => {
          if (experience.id === action.payload.id) {
            return {
              ...experience,
              organization_name: action.payload.organization_name,
            };
          } else {
            return experience;
          }
        }),
      };
    case actionTypes.EDITSTARTYEAR:
      return {
        ...state,
        experiences: state.experiences.map((experience) => {
          if (experience.id === action.payload.id) {
            return {
              ...experience,
              start_year: action.payload.start_year,
            };
          } else {
            return experience;
          }
        }),
      };
    case actionTypes.EDITENDYEAR:
      return {
        ...state,
        experiences: state.experiences.map((experience) => {
          if (experience.id === action.payload.id) {
            return {
              ...experience,
              end_year: action.payload.end_year,
            };
          } else {
            return experience;
          }
        }),
      };
    default:
      return state;
  }
};

export const keySkillsReducer = (state = initialSkillsState, action) => {
  switch (action.type) {
    case actionTypes.ADDNEWSKILLS:
      return { ...state, skills: [...state.skills, ""] };
    case actionTypes.EDITSKILL: {
      const newSkills = state.skills.map((eachSkill, id) => {
        if (id === action.payload.index) {
          return action.payload.skill;
        } else {
          return eachSkill;
        }
      });

      return {
        ...state,
        skills: newSkills,
      };
    }
    case actionTypes.DELETESKILL: {
      const newSkills = state.skills.filter(
        (skill, id) => id !== action.payload
      );

      return { ...state, skills: newSkills };
    }
    default:
      return state;
  }
};

export const educationDetailsReducer = (
  state = initialEducationState,
  action
) => {
  switch (action.type) {
    case actionTypes.EDITTYPE:
      return {
        ...state,
        domain: action.payload,
      };
    case actionTypes.EDITUNIVERSITY:
      return {
        ...state,
        university: action.payload,
      };
    case actionTypes.EDITDEGREE:
      return {
        ...state,
        degree: action.payload,
      };
    case actionTypes.EDITEDUCATIONSTARTYEAR:
      return {
        ...state,
        start_year: action.payload,
      };
    case actionTypes.EDITEDUCATIONENDYEAR:
      return {
        ...state,
        end_year: action.payload,
      };
    default:
      return state;
  }
};
