import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';

const Main =({children})=>{
  console.log("main rendered");
  return(
    <>
 {/* <!-- Page Wrapper --> */}
 <div id="wrapper">

{/* <!-- Sidebar --> */}
<Sidebar/>
{/* <!-- End of Sidebar --> */}

{/* <!-- Content Wrapper --> */}
<div id="content-wrapper" className="d-flex flex-column">

    {/* <!-- Main Content --> */}
    <div id="content">

        {/* <!-- Topbar --> */}
         <TopBar/>
        {/* <!-- End of Topbar --> */}

        {/* <!-- Begin Page Content --> */}
        
        <main>{children}</main>
        {/* <!-- /.container-fluid -->Z */}

    </div>
    {/* <!-- End of Main Content -->Z */}

    {/* <!-- Footer --> */}
   <Footer/>
    {/* <!-- End of Footer --> */}

</div>
{/* <!-- End of Content Wrapper --> */}

</div>
{/* <!-- End of Page Wrapper --> */}
</>
  );
}
export default Main;