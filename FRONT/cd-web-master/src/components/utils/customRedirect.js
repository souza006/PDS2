export default function customRedirect(path){
    const base_url=`http://clarimdiario.devops.ifrn.edu.br/`
    //const base_url=`http://localhost:3000/`
    window.location.href=`${base_url}${path}`

   
}