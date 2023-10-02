export default function LogOut(){
    const data = localStorage.removeItem("token");
    console.log(data)
    window.location.reload();
}