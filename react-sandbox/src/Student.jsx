import propTypes from "prop-types";

function Student(props) {
    return (
        <div className="student">
            <p>Name: {props.name}</p>
            <p>Age: {props.age > 20 ? props.age:"Too Young"}</p>
            <p>Career: {props.career}</p>
            <p>Student: {props.isStudent ? "Yes":"No"}</p>
        </div>
    );  
};

Student.propTypes = {
    name: propTypes.string,
    age: propTypes.number,
    isStudent: propTypes.bool,
};

export default Student;