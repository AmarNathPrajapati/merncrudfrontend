import React from 'react'

const FormData = (handleChange,handleSubmit,data) => {
  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-5">Name</label>
                        <input onChange={handleChange}
                            value={
                                data.name
                            }
                            type="text"
                            className="form-control"
                            name='name'
                            id="name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fs-5">Email</label>
                        <input onChange={handleChange}
                            value={
                                data.email
                            }
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label fs-5">Phone</label>
                        <input onChange={handleChange}
                            value={
                                data.phone
                            }
                            type="tel"
                            className="form-control"
                            id="phone"
                            name='phone'/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> 
    </div>
  )
}

export default FormData
