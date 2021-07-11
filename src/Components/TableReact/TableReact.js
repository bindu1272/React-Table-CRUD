import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Helper from "../Utils/Helper";
import { SUBJECTS } from "../Utils/Constants";
class TableReact extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isEdit: false,
      students: {
        studentName: "",
        gender: null,
        branch: "",
        phoneNumber: "",
        subjects: SUBJECTS,
      },
      studentInfo: []
    }
  }
  changeCheckboxHandler = (index) => {
    let students = { ...this.state.students };
    let subjects = [...students.subjects];
    subjects[index] = { ...subjects[index], checked: !subjects[index].checked };
    students = { ...students, subjects: subjects };
    this.setState({
      students,
    });
  };
  changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let students = { ...this.state.students };
    students[name] = value;
    this.setState({
      students: students,
    });
  };
  createInformation = (event) => {
    event.preventDefault();
    let studentInfo = [...this.state.studentInfo];
    let students = { ...this.state.students };
    let subjects = [...students.subjects];
    let checkedSubjects = [];
    subjects.map((subject, i) => {
      if (subject.checked) {
        checkedSubjects.push(subject.subName);
      }
    });
    if (students.index >= 0) {
      let index = students.index;
      studentInfo[index] = {
        ...studentInfo[index],
        studentName: students.studentName,
        gender: students.gender,
        branch: students.branch,
        phoneNumber: students.phoneNumber,
        subjects: checkedSubjects,
      };
    } else {
      studentInfo.push({
        studentName: students.studentName,
        gender: students.gender,
        branch: students.branch,
        phoneNumber: students.phoneNumber,
        subjects: checkedSubjects,
      });
    }
    let studentInfoEmpty = {
      studentName: "",
      gender: null,
      branch: "",
      phoneNumber: "",
      subjects: SUBJECTS,
    };
    this.setState({
      studentInfo: studentInfo,
      students: studentInfoEmpty,
      isEdit: false,
    });
  };
  editInformation = (index) => {
    let studentInfo = [...this.state.studentInfo];
    let students =  studentInfo[index];
    students["index"] = index;
    let subjects = [...SUBJECTS];
    let checkedSubjects = [...students.subjects];
    for (let i = 0; i < checkedSubjects.length; i++) {
      for (let j = 0; j < SUBJECTS.length; j++) {
        if (subjects[j].subName === checkedSubjects[i]) {
          subjects[j] = { ...subjects[j], checked: true };
        }
      }
    }
    students = { ...students, subjects: subjects };
    this.setState({
      students: students,
      isEdit: true,
    });
  };
  removeInformation = (index) => {
    let studentInfo = [...this.state.studentInfo];
    studentInfo.splice(index, 1);
    let studentInfoEmpty = {
      studentName: "",
      gender: null,
      branch: "",
      phoneNumber: "",
      subjects: SUBJECTS,
    };
    this.setState({
      studentInfo: studentInfo,
      students: studentInfoEmpty,
      isEdit: false,
    });
  };
  render() {
    const columns = [
      {
        Header: "Student Name",
        accessor: "studentName",
        show: true,
      },
      {
        Header: "Action",
        Cell: (row) => (
          <div>
              <button onClick={()=>this.editInformation(row.index)}>Edit</button>
              <button onClick={()=>this.removeInformation(row.index)}>Delete</button>
          </div>
        )
      }
    ];
    return (
      <div>
        {Helper.formTemplate(
          this.state.students.studentName,
          this.state.students.gender,
          this.state.students.branch,
          this.state.students.subjects,
          this.state.students.phoneNumber,
          this.state.isEdit,
          this.changeHandler,
          this.changeCheckboxHandler,
          this.createInformation
        )}
        <ReactTable
          data={this.state.studentInfo}
          minRows={1}
          columns={columns}
          showPagination={false}
        />
      </div>
    );
  }
}
export default TableReact;
