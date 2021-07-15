import React from "react";
import { GENDER, STUDENTTABLEHEADING } from "./Constants";
import { Fragment } from "react";
const Helper = {
  formTemplate: (
    studentName,
    gender,
    branch,
    subjects,
    phoneNumber,
    isEdit,
    changeHandler,
    changeCheckboxHandler,
    createInformation,
    changeCancel
  ) => {
    return (
      <form onSubmit={createInformation} className="modal-content">
        <fieldset>
          <legend>Student Details</legend>
          <div className="details">
            <label>StudentName</label>
            <input
              type="text"
              value={studentName}
              name="studentName"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="details">
            <label>Gender</label>
            {GENDER.map((g, i) => {
              return (
                <Fragment>
                  <input
                    type="radio"
                    value={i}
                    name="gender"
                    id = {g+i}
                    checked={gender == i ? true : false}
                    onChange={changeHandler}
                  />
                  <label htmlFor={g+i}>{g}</label>
                </Fragment>
              );
            })}
          </div>
          <div className="details">
            <label>Students Branch</label>
            <select onChange={changeHandler} value={branch} name="branch">
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="details">
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              name="phoneNumber"
              onChange={changeHandler}
              maxLength = "10"
              required
            />
          </div>
          <div className="details">
            <label>Favourite Subjects</label>
            {subjects.map((subject, i) => {
              return (
                <Fragment>
                  <input
                    type="checkbox"
                    name={subject.subName}
                    checked={subject.checked}
                    onChange={() => changeCheckboxHandler(i)}
                  />
                  <label>{subject.subName}</label>
                </Fragment>
              );
            })}
          </div>
          <div className="details">
            <button type="submit">{isEdit ? "update" : "create"}</button>
            <button onClick={changeCancel} className="close">Cancel</button>
          </div>
        </fieldset>
      </form>
    );
  },
  tableofInformation: (studentInfo, editInformation, removeInformation) => {
    return (
      <table>
        <thead>
          <tr>
            {STUDENTTABLEHEADING.map((studentRecord, index) => {
              return <th>{studentRecord}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {!studentInfo.length && (
            <tr className="no-data">
              <td colSpan={STUDENTTABLEHEADING.length}>No data is Available</td>
            </tr>
          )}
          {studentInfo.map((studentRecord, index) => {
            return (
              <tr>
                <td key={index}>{studentRecord.studentName}</td>
                <td className="actions">
                  <button onClick={() => editInformation(index)}>Edit</button>
                  <button onClick={() => removeInformation(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
};
export default Helper;
