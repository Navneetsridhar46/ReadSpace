const validation = (values) => {
    let errors = {}


    if (!values.firstname) {
        errors.firstname = "FirstName Required"
    }
    else if (values.firstname.length < 5) {
        errors.firstname = "Name must be more than 5 characters"
    }

    if (!values.lastname) {
        errors.lastname = "LastName Required"
    }
    else if (values.lastname.length < 5) {
        errors.lastname = "Name must be more than 5 characters"
    }

    if (!values.email) {
        errors.email = "Email Required"
    }
    else if (values.email.length < 5) {
        errors.email = "Email must be more than 5 characters"
    }
    if (!values.mobile) {
        errors.mobile = "Mobile number Required!!"
    }
    else if (values.mobile.length < 10) {
        errors.mobile = "Enter 10 digit mobile number"
    }

    if (!values.password) {
        errors.password = "Password Required"
    }
   
   
     return errors

}

export default validation

