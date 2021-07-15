import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Helper from "../Utils/Helper";
import { GENDER, SUBJECTS } from "../Utils/Constants";
const CustomNoDataComponent = () => {
  return <div className="rt-noData">No Data is Available</div>;
};
const STUDENTSINFOEMPTY = {
  studentName: "",
  gender: null,
  branch: "",
  phoneNumber: "",
  subjects: SUBJECTS,
};
class TableReact extends Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      students: {
        studentName: "",
        gender: null,
        branch: "",
        phoneNumber: "",
        subjects: SUBJECTS,
      },
      isaddForm: false,
      studentInfo: [
        {
          studentName: "bindu",
          gender: 0,
          branch: "cse",
          phoneNumber: "88826763",
          subjects: ["c", "c++"],
        },
        {
          studentName: "jyothi",
          gender: 0,
          branch: "ece",
          phoneNumber: "56253662",
          subjects: ["java"],
        },
      ],
      searchStudentDetails: [],
      isFilerDetails: false,
      searchValue: "",
    };
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
    this.setState({
      studentInfo: studentInfo,
      students: STUDENTSINFOEMPTY,
      isEdit: false,
      isaddForm: false,
    });
  };
  editInformation = (index) => {
    let studentInfo = [...this.state.studentInfo];
    let students = studentInfo[index];
    students["index"] = index;
    let subjects = [...SUBJECTS];
    let checkedSubjects = [...students.subjects];
    for (let i = 0; i < checkedSubjects.length; i++) {
      for (let j = 0; j < subjects.length; j++) {
        if (subjects[j].subName === checkedSubjects[i]) {
          subjects[j] = { ...subjects[j], checked: true };
        }
      }
    }
    students = { ...students, subjects: subjects };
    this.setState({
      students: students,
      isEdit: true,
      isaddForm: true,
    });
  };
  removeInformation = (index) => {
    let studentInfo = [...this.state.studentInfo];
    studentInfo.splice(index, 1);
    this.setState({
      studentInfo: studentInfo,
      students: STUDENTSINFOEMPTY,
      isEdit: false,
    });
  };
  addForm = () => {
    this.setState({
      isaddForm: true,
      students: STUDENTSINFOEMPTY,
    });
  };
  changeCancel = () => {
    this.setState({
      isaddForm: false,
      students: STUDENTSINFOEMPTY,
    });
  };
  searchValue = (event) => {
    let value = event.target.value;
    this.setState({
      searchValue: value,
    });
  };
  searchHandler = () => {
    let value = this.state.searchValue;
    let studentInfo = [...this.state.studentInfo];
    if (value !== "") {
      let studentDetails = studentInfo.filter((student) => {
        return (
          student.studentName &&
          student.studentName.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
      this.setState({
        searchStudentDetails: studentDetails,
        isFilerDetails: true,
      });
    } else {
      this.setState({
        searchStudentDetails: [],
        isFilerDetails: false,
      });
    }
  };

  filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };
  render() {
    const columns = [
      {
        Header: "Student Name",
        accessor: "studentName",
        show: true,
        filterable: true,
      },
      {
        Header: "Gender",
        show: true,
        id: "gender",
        accessor: (rowInfo) => {
          return <span>{GENDER[rowInfo.gender]}</span>;
        },
      },
      {
        Header: "Branch",
        accessor: "branch",
        show: true,
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        show: true,
      },
      {
        Header: "Favourite Subjects",
        show: true,
        id: "subjects",
        accessor: (rowInfo) => {
          let output = [];
          rowInfo.subjects.map((sub) => {
            output.push(sub);
          });
          return output.join(", ");
        },
      },
      {
        Header: "Action",
        id: "action",
        Cell: (row) => (
          <div className="actions">
            <button onClick={() => this.editInformation(row.index)}>
              Edit
            </button>
            <button
              onClick={() => this.removeInformation(row.index)}
              className="remove"
            >
              Delete
            </button>
          </div>
        ),
      },
    ];
    return (
      <>
        {this.state.isaddForm && (
          <div className="modal">
            {Helper.formTemplate(
              this.state.students.studentName,
              this.state.students.gender,
              this.state.students.branch,
              this.state.students.subjects,
              this.state.students.phoneNumber,
              this.state.isEdit,
              this.changeHandler,
              this.changeCheckboxHandler,
              this.createInformation,
              this.changeCancel
            )}
          </div>
        )}
        <div className="constantInfo">
          <h1 align="center">Students Information</h1>
          <div className="searchData">
            <div>
              <input
                type="text"
                placeholder="Enter student Name"
                onChange={this.searchValue}
              />
              <button onClick={this.searchHandler} className="search-button">
                Search
              </button>
            </div>
            <button onClick={this.addForm}>Add Student</button>
          </div>
          <ReactTable
            data={
              this.state.isFilerDetails
                ? this.state.searchStudentDetails
                : this.state.studentInfo
            }
            minRows={0}
            columns={columns}
            showPagination={false}
            NoDataComponent={CustomNoDataComponent}
            defaultFilterMethod={this.filterCaseInsensitive}
            defaultSorted={[{ id: "studentName" }]}
          />
        </div>
      </>
    );
  }
}
export default TableReact;
