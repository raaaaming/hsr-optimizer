export async function handler(request){

    switch(request.method){

        case "GET":
            return getBuilds();

        case "POST":
            return createBuild();

    }

}