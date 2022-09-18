import { Avatar, Button, Divider, Paper } from "@mui/material";
import React, { useState } from "react";
import "../Styles/PersonalInfoComponent.css";
import BackNextBtnComponent from "./BackNextBtnComponent";
import InputComponent from "./InputComponent";
import { connect } from "react-redux";
import Avatar1 from "react-avatar-edit";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  editAddress,
  editCity,
  editEmail,
  editFirstName,
  editLastName,
  editMobile,
  editObjective,
  editPostalCode,
  editState,
} from "../Redux/actions";
import { useForm } from "react-hook-form";

const mapStateToProps = (state) => ({
  personalInfo: state.personalInfoReducer.personalInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setFirstName: (first_name) => dispatch(editFirstName(first_name)),
  setLastName: (last_name) => dispatch(editLastName(last_name)),
  setEmail: (email) => dispatch(editEmail(email)),
  setMobile: (mobile) => dispatch(editMobile(mobile)),
  setAddress: (address) => dispatch(editAddress(address)),
  setCity: (city) => dispatch(editCity(city)),
  setStateName: (state) => dispatch(editState(state)),
  setPostalCode: (postal_code) => dispatch(editPostalCode(postal_code)),
  setObjective: (objective) => dispatch(editObjective(objective)),
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const PersonalInfoComponent = (props) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [img, setImg] = useState(null);
  const [sotreImage, setSotreImage] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = (data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1000);
  };

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  const onCrop = (view) => {
    setImg(view);
  };

  const onClose = (view) => {
    setImg(null);
  };
  const saveImage = () => {
    setSotreImage([{ img }]);
    setOpen(false);
  };
  const profileImg = sotreImage.map((ele) => ele.img);
  return (
    <Paper className="personal-info-paper" elevation={3}>
      <Avatar
        sx={{ width: 120, height: 120, marginBottom: 1 }}
        alt="profile img"
        src={
          profileImg.length
            ? profileImg
            : `https://img.icons8.com/color/344/test-account.png`
        }
      />
      <div>
        <Button
          className="change-profile-photo-btn"
          variant="outlined"
          onClick={handleClickOpen}>
          Change Profile Photo
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}>
            Update Image
          </BootstrapDialogTitle>
          <DialogContent>
            <Avatar1
              width={400}
              height={300}
              onCrop={onCrop}
              onClose={onClose}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" onClick={saveImage}>
              Save
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <form onSubmit={handleSubmit(handleNext)}>
        <div className="personal-info-form-fields">
          <InputComponent
            title={"First Name"}
            type={"text"}
            name={"firstName"}
            register={register}
            multiline={false}
            value={props.personalInfo.first_name}
            setValue={props.setFirstName}
            error={errors.firstName ? true : false}
            errorMessage={errors.firstName ? errors.firstName.message : null}
          />
          <InputComponent
            title={"Last Name"}
            type={"text"}
            name={"lastName"}
            register={register}
            multiline={false}
            value={props.personalInfo.last_name}
            setValue={props.setLastName}
            error={errors.lastName ? true : false}
            errorMessage={errors.lastName ? errors.lastName.message : null}
          />
          <InputComponent
            title={"Email"}
            type={"email"}
            name={"email"}
            register={register}
            multiline={false}
            value={props.personalInfo.email}
            setValue={props.setEmail}
            error={errors.email ? true : false}
            errorMessage={errors.email ? errors.email.message : null}
          />
          <InputComponent
            title={"Mobile"}
            type={"number"}
            name={"mobile"}
            register={register}
            multiline={false}
            value={props.personalInfo.mobile}
            setValue={props.setMobile}
            error={errors.mobile ? true : false}
            errorMessage={errors.mobile ? errors.mobile.message : null}
          />
        </div>
        <InputComponent
          title={"Address"}
          type={"text"}
          name={"address"}
          register={register}
          multiline={false}
          value={props.personalInfo.address}
          setValue={props.setAddress}
          error={errors.address ? true : false}
          errorMessage={errors.address ? errors.address.message : null}
        />
        <div style={{ marginTop: 20 }} className="personal-info-form-fields">
          <InputComponent
            title={"City"}
            type={"text"}
            name={"city"}
            register={register}
            multiline={false}
            value={props.personalInfo.city}
            setValue={props.setCity}
            error={errors.city ? true : false}
            errorMessage={errors.city ? errors.city.message : null}
          />
          <InputComponent
            title={"State"}
            type={"text"}
            name={"state"}
            register={register}
            multiline={false}
            value={props.personalInfo.state_name}
            setValue={props.setStateName}
            error={errors.state ? true : false}
            errorMessage={errors.state ? errors.state.message : null}
          />
          <InputComponent
            title={"Postal Code"}
            type={"number"}
            name={"postalCode"}
            register={register}
            multiline={false}
            value={props.personalInfo.postal_code}
            setValue={props.setPostalCode}
            error={errors.postalCode ? true : false}
            errorMessage={errors.postalCode ? errors.postalCode.message : null}
          />
        </div>
        <InputComponent
          title={"Objective"}
          type={"text"}
          name={"objective"}
          register={register}
          multiline={true}
          value={props.personalInfo.objective}
          setValue={props.setObjective}
          error={errors.objective ? true : false}
          errorMessage={errors.objective ? errors.objective.message : null}
        />
        <Divider className="personal-details-divider" />
        <BackNextBtnComponent
          // onNext={() => handleSubmit(handleNext)}
          loading={loading}
          tab={props.tab}
          nextTitle={"Next"}
          backTitle={"Back"}
        />
      </form>
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfoComponent);
