
function AccountButton({ children, onClick }){
    return(
        <button className="bg-slate-700 p-2 rounded-md hover:bg-slate-800" onClick={onClick}>
            {children}
        </button>
    )
}

export default AccountButton