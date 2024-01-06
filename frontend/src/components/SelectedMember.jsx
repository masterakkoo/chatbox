import React from 'react'
import grp_icon from "../images/add-group.png"
const SelectedMember = () => {
    return (
        <>
            <a data-toggle="modal" href="#myModal" class="btn btn-primary"><img src={grp_icon} /></a>

            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content bg-[#0e262d]">
                        <div class="modal-header">
                            <h4 class="modal-title">Modal title</h4>
                            <button type="button" class="close" data-dismiss="modal">×</button>
                        </div><div class="container"></div>
                        <div class="modal-body">
                            <div className='text-[#e3d8d8] ' style={{ display: "flex", justifyContent: "center" }}>

                                <input style={{ backgroundColor: "#5B6376" }} className='m-2 p-1' placeholder="Group Name" type='text' name='name' value={name}
                                    onChange={(e) => setname(e.target.value)} />
                                <input style={{ backgroundColor: "#5B6376" }} className='m-2 p-1' placeholder="Add Members" type='text' name='search' value={search}
                                    onChange={(e) => { setsearch(e.target.value); Handle(e.target.value) }} />
                            </div>
                            {(loading) ? <div style={{ display: "flex", justifyContent: "center" }}><Dna

                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            /></div> :
                                <div>
                                    {(res.length != 0) ? res.map(val => (
                                        <GroupSearch
                                            fname={val.fname}
                                            lname={val.lname}
                                            img={val.profile_pic}
                                            email={val.email}
                                            _id={val._id}
                                            ADDFRIEND={() => addfriend(val)}
                                        />
                                    ))

                                        : <p className='text-[#9d9d9d]'>No user found</p>}
                                </div>}


                        </div>
                        <div class="modal-footer">
                            <button><a style={{ backgroundColor: "#0e262d" }} className='bg-[#0e262d] btn btn-primary'
                                data-toggle="modal" href="#myModal2" >Open modal2</a></button>
                            {/* <a href="#" data-dismiss="modal" class="btn">Close</a> */}
                            <button type="button" class="bg-[#0e262d] btn btn-primary" data-dismiss="modal">Close</button>
                            <button type="button" class=" btn btn-primary">Create Group</button>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" id="myModal2" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content bg-[#0e262d]">
                        <div class="modal-header">
                            <h4 class="modal-title">2nd Modal title</h4>
                            <button type="button" class="close" data-dismiss="modal">×</button>
                        </div><div class="container"></div>
                        <div class="modal-body">
                            ..
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class=" bg-[#0e262d] btn btn-primary">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectedMember