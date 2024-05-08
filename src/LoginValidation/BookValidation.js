const BookValidation = (values) => {
    let errors = {}


    if (!values.title) {
        errors.title = "Book title Required"
    }

    if (!values.price) {
        errors.price = "Book price Required"
    }
   

    if (!values.description) {
        errors.description = "Book description Required"
    }
    else if (values.description.length < 10) {
        errors.description = "Description must contain atleast 10 characters"
    }
    if (!values.category) {
        errors.category = "Category Required!!"
    }

    if (!values.quantity) {
        errors.quantity = "Quantity Required"
    }
    else if (values.quantity.length > 0) {
        errors.quantity = "Minimum Quanity : 1"
    }

    return errors

}

export default BookValidation

