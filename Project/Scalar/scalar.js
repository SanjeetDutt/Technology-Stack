async function getAPIResponse(url){
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("API not success")
    }

    return await response
}

async function getAPI(url){
    try{
        const response = await getAPIResponse(url)
        return response.json()
    } catch(error){
        // console.error(error)
        return null
    }
}

async function geAPIText(url){
    try{
        const response = await getAPIResponse(url)
        return response.text()
    } catch(error){
        // console.error(error)
        return null
    }
}

// getAPI("https://www.scaler.com/mentee-modules/?filter[category]=core")
async function getAllModules(){
    const modules = await getAPI("https://www.scaler.com/mentee-modules/?filter[category]=core")
    return modules.included.filter(data=>data.type === 'academy_module')

}

async function getAllLectures(id){
    const lectures = await getAPI(`https://www.scaler.com/mentee-academy-topics/classes?filter[academy_module_id]=${id}&filter[status][]=active&filter[status][]=locked&filter[status][]=repeat&filter[status][]=bonus&filter[category]=core&filter[lecture_bucket][]=Optional&filter[lecture_bucket][]=Remedial&&sort=date_of_topic&include[]=super_batch_academy_topic.academy_topic&include[]=super_batch_academy_topic&include[]=super_batch_academy_topic.academy_topic.academy_module`)
    return lectures.included.filter(lecture=>lecture.type === "super_batch_academy_topic")
}

async function getLectureDetails(id){
    const response = await getAPI(`https://www.scaler.com/api/v2/classroom/${id}/session`)
    if(!response){
        return
    }
    const {session_link, title,start_time} = response.data.attributes.batch_lesson
    const lectureDate = new Date(start_time)
    const startDate = new Date('2023-01-01T00:00:00.000Z')
    const difTime = Math.abs(startDate - lectureDate)
    const difDays = Math.floor(difTime / (1000 * 60 * 60 * 24))
    return {link: session_link, title, days: difDays}
}

async function getRecordingLinks(link){
    const meetingId = link.split("/")[3]
    if(!meetingId){
        return
    }
    const response = await getAPI(`https://www.scaler.com/meetings/${meetingId}/recordings`)
    if(!response){
        return
    }
    return response.recordings.map(e=>e.url)
    
}

function downloadFile(content, fileName, contentType) {
  // 1. Create a Blob with the data
  const blob = new Blob([content], { type: contentType });

  // 2. Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // 3. Create a hidden 'a' element
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName; // Suggests the filename to the browser
  
  // 4. Append to body, click it, then remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 5. Clean up the URL to free memory
  URL.revokeObjectURL(url);
}

async function downloadStream(link){
    const response = await geAPIText(`https://www.scaler.com${link}`)
    downloadFile(response, link, "text/plain")
}

async function downloadRecording(link){
    const masterResponse = await geAPIText(`https://www.scaler.com${link}`)
    if(!masterResponse){
        return
    }
    if(masterResponse.includes("stream_1.m3u8")){
        const fileName = link.replace("master.m3u8","stream_1.m3u8")
        downloadStream(fileName)
        return fileName
    } else {
        const fileName = link.replace("master.m3u8","stream_0.m3u8")
        downloadStream(fileName)
        return fileName
    }
}

async function main(moduleIdToFetch = []){
    console.log(">> STARTING APPLICATION")

    console.log(">> GETTING ALL MODULES LIST")
    const modules = await getAllModules()

    console.log(">> GOT ALL MODULE LIST TOTAL : ", modules.length)
    console.log("MODULES : " , modules.map(e=>({id: e.attributes.id, name:e.attributes.name})))

    const recordingLogs = []

    for(module of modules){
        const {id:moduleId, name:moduleName} = module.attributes

        if(!moduleIdToFetch.includes(moduleId)){
            console.log(`>> SKIPPING ${moduleName}`)
            continue
        }

        console.log(">> GETTING DETAILS FOR : ", moduleName)
        if(!moduleId){
            console.error(">> NOT ABLE TO DOWNLOAD MODULE : ", moduleName)
            continue
        }

        console.log("GETTING DETAILS OF LECTURES")
        const lectures = await getAllLectures(moduleId)
        console.log("GOT LECTURE DETAILS TOTAL : " , lectures.length)
        console.log("LECTURES " , lectures)

        for(lecture of lectures){
            if(!lecture.id){
                console.error(">> NOT ABLE TO DOWNLOAD LECTURE WITH ID : ", lecture.id)
                continue
            }
            const {link, title, days} = await getLectureDetails(lecture.id) || {}

            if(!link || !title){
                console.error(">> NOT ABLE TO DOWNLOAD MODULE : ", title)
                continue
            }

            console.log(">> GETTING DETAILS FOR : ", title)

            console.log(">> GETTING RECORDING LINKS")
            const links = await getRecordingLinks(link) 
            if(!links){
                continue
            }
            console.log(">> GOT ALL RECORDING LINKS TOTAL : ", links.length)
            if(!links){
                continue
            }

            for(reclink of links){
                console.log(">> DOWNLOADING STREAM FILE")
                const fileName = await downloadRecording(reclink)
                console.log(">> DOWNLOADED STREAM FILE NAME : ", fileName)
                if(!fileName){
                    console.error(">> NOT ABLE TO RECORDING FOR  : ", title)
                    continue
                }

                recordingLogs.push({
                    moduleName,
                    title,
                    reclink,
                    fileName,
                    day: days
                })
            }
        }
        
    }
    
    console.log("EXTRACTION COMPLETED : ", {recordingLogs})
    
}

main([56,71,10,72,29,73,32])


const modules = [
    {
        "id": 1,
        "name": "Introduction"
    },
    {
        "id": 34,
        "name": "Introduction to Problem Solving (Intermediate) 1"
    },
    {
        "id": 3,
        "name": "Introduction to Problem Solving (Intermediate) 2"
    },
    {
        "id": 35,
        "name": "Advanced DSA 1"
    },
    {
        "id": 36,
        "name": "Advanced DSA 2"
    },
    {
        "id": 37,
        "name": "Advanced DSA 3"
    },
    {
        "id": 4,
        "name": "Advanced DSA 4"
    },
    {
        "id": 6,
        "name": "Computer Systems and Fundamentals"
    },
    {
        "id": 61,
        "name": "Databases & SQL"
    },
    {
        "id": "38D",
        "name": "LLD: Object Oriented Design and Analysis"
    },
    {
        "id": "84D",
        "name": "Backend LLD and Development 1"
    },
    {
        "id": "62D",
        "name": "LLD & Development 1"
    },
    {
        "id": "63D",
        "name": "LLD & Development 2"
    },
    {
        "id": "85D",
        "name": "Backend LLD and Development 2"
    },
    {
        "id": "7D",
        "name": "LLD: Practical Software Engineering and Design"
    },
    {
        "id": "86D",
        "name": "Backend LLD and Development 3"
    },
    {
        "id": "64D",
        "name": "LLD & Development 3"
    },
    {
        "id": "39D",
        "name": "Front-end Development"
    },
    {
        "id": "8D",
        "name": "High Level Design"
    },
    {
        "id": "124D",
        "name": "Backend Capstone Project"
    },
    {
        "id": "90D",
        "name": "Capstone Project"
    },
    {
        "id": "9D",
        "name": "Back-end Development"
    },
    {
        "id": 56,
        "name": "Data Engineering"
    },
    {
        "id": 71,
        "name": "Data Analytics and Visualisation - Python Libraries"
    },
    {
        "id": 10,
        "name": "Product Management for Software Engineers"
    },
    {
        "id": 72,
        "name": "Data Analytics and Visualisation - Probability and Stats"
    },
    {
        "id": 29,
        "name": "DSA for Competitive Programming"
    },
    {
        "id": 73,
        "name": "Data Analytics and Visualisation - Fundamentals"
    },
    {
        "id": 32,
        "name": "Product Analytics"
    }
]