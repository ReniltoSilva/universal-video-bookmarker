const btnSave = document
  .querySelector("#saveBtn")
  .addEventListener("click", () => {
    //Execution in the PopUp
    const msg = document.getElementById("msg");
    msg.innerText = "Mark saved";
    let note = document.getElementById("note");

    //Execution in the DOM
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(tabs);

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        args: [note.value],
        func: (args) => {
          const hasVideo = document.getElementsByTagName("iframe");
          console.log(args);
          if (hasVideo) {
            console.log("The page has a video");
            const progressBar = document.querySelector(".ytp-progress-bar");
            let timeStamp = progressBar.getAttribute("aria-valuetext");

            //Save timeStamp in chrome local storage
            chrome.storage.local.get(["timeList"], (result) => {
              if (result.timeList) {
                console.log(result.timeList);
              } else {
                chrome.storage.local.set({ timeList: timeStamp }, () =>
                  console.log(`${timeStamp}: Created in local storage`)
                );
              }
            });
          }
        },
      });
    });

    note.value = "";
  });
