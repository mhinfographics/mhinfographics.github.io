document.addEventListener('DOMContentLoaded', () => {
    if (typeof menuCheck === 'function') menuCheck();
    // Download bug as PNG using html2canvas
    const downloadBtn = document.getElementById('download_btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async function() {
            const customBug = document.getElementById('custom_bug');
            if (!window.html2canvas) {
                alert('Image download not available yet. Please wait a moment and try again.');
                return;
            }
            // Only select the visual part (exclude button)
            const visual = customBug.querySelector('.visual.size-320') || customBug;
            window.html2canvas(visual, {backgroundColor: null}).then(canvas => {
                const link = document.createElement('a');
                link.download = 'my_custom_bug.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        });
    }
    const slotMachines = document.querySelectorAll('.slot_machine');

    // Add random bug head
    const customBugHeadDiv = document.querySelector('#custom_bug .head');
    if (customBugHeadDiv) {
        const headNum = Math.floor(Math.random() * 3) + 1;
        const img = document.createElement('img');
        img.className = 'bug head';
        img.src = `img/tiles/bug-heads-0${headNum}.png`;
        customBugHeadDiv.appendChild(img);
    }

    // Add random bug tail
    const customBugTailDiv = document.querySelector('#custom_bug .tail');
    if (customBugTailDiv) {
        const tailNum = Math.floor(Math.random() * 3) + 1;
        const img = document.createElement('img');
        img.className = 'bug tail';
        img.src = `img/tiles/bug-tails-0${tailNum}.png`;
        customBugTailDiv.appendChild(img);
    }

    // Add random bug body every 10 seconds until #custom_bug is reached
    const customBugBodyDiv = document.querySelector('#custom_bug .body');
    let lastBodyTime = 0;
    function addRandomBugBody() {
    if (!customBugBodyDiv) return;
    const bodyNum = Math.floor(Math.random() * 6) + 1;
    const img = document.createElement('img');
    img.className = 'bug body';
    img.src = `img/tiles/bug-body-0${bodyNum}.png`;
    customBugBodyDiv.appendChild(img);
    //console.log(`Added bug body image: bug-body-0${bodyNum}.png at ${bugTimer} seconds`);
    }

    // Track if user reached #custom_bug
    let bugReached = false;

    function bodyImageTimerCheck() {
        if (bugReached) return;
        if (bugTimer > 0 && bugTimer % 10 === 0 && bugTimer !== lastBodyTime) {
            addRandomBugBody();
            lastBodyTime = bugTimer;
        }
    }

    // Timer logic for bug growth
    let bugTimer = 0;
    let bugInterval = null;
    function startBugTimer() {
        bugTimer = 0;
        //console.log('Bug timer started');
        bugInterval = setInterval(() => {
            bugTimer++;
            bodyImageTimerCheck();
        }, 1000);
    }
    function stopBugTimer() {
        if (bugInterval) {
            clearInterval(bugInterval);
            bugInterval = null;
            //console.log('Bug timer stopped');
        }
        // Add a random blend class to all images inside #custom_bug
        const blendClasses = ['blend01', 'blend02', 'blend03', 'blend04'];
        const randomClass = blendClasses[Math.floor(Math.random() * blendClasses.length)];
        const customBug = document.getElementById('custom_bug');
        if (customBug) {
            const imgs = customBug.querySelectorAll('img');
            imgs.forEach(img => {
                // Remove any previous blend class
                blendClasses.forEach(cls => img.classList.remove(cls));
                img.classList.add(randomClass);
            });
        }
    }
    startBugTimer();

    // Intersection Observer for #custom_bug
    const customBug = document.getElementById('custom_bug');
    if (customBug) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    onCustomBugVisible();
                    observer.unobserve(entry.target); // Only trigger once
                }
            });
        }, { threshold: 0.1 });
        observer.observe(customBug);
    }

    function onCustomBugVisible() {
    bugReached = true;
    stopBugTimer();
        // Bug names
        const bugTexts = [
            "Creepede", "Skrittermite", "Buzzlefink", "Jitterbuggle", "Gnawtick", "Clackroach", "Zizzlefly", "Pincermite", "Wrigglaphid", "Chompalid", "Snipetle", "Thrumnid", "Skittlebug", "Nibblenid", "Pesterfly", "Grittermite", "Chompede", "Ploddipede", "Scutterfly", "Grumblebug", "Buzzlenid", "Scritchling", "Nibblepede", "Skwirmite", "Fluttermite", "Snarfbug", "Scuttlepede", "Buzzleafid", "Cracklechaf", "Nibbleroid", "Jittermite", "Wriggleafid", "Pinchpede", "Poffletick", "Grindlepede", "Scratchmite", "Guzzlebug", "Clatterpede", "Buzzlechaf", "Gnarlaphid", "Wigglemite", "Tatterfly", "Snappede", "Scrachnid", "Fizzletick", "Pricklebug", "Chittermite", "Rumblepede", "Skitterfly", "Nibblerafid"
        ];
        // Randomly select a bug name
        const randomText = bugTexts[Math.floor(Math.random() * bugTexts.length)];
        const bugName = document.querySelector('#custom_bug .bugName');
        if (bugName) {
            bugName.textContent = randomText;
        }
        // Set the bug-size text
        const bugSize = document.querySelector('#custom_bug .bug-size');
        if (bugSize) {
            bugSize.textContent = bugTimer.toString().padStart(2, '0');
        }
    }
    // Slot machine logic
    const slotImages = {
        'machine_1': 'img/slot01.jpg',
        'machine_2': 'img/slot02.jpg',
        'machine_3': 'img/slot03.jpg'
    };
    const positions = 12; // Number of positions for each image

    // Store references to control spinning
    const spinControllers = [];

    // Hide reset button initially
    const resetBtn = document.getElementById('reset_btn');
    if (resetBtn) {
        resetBtn.style.display = 'none';
        resetBtn.addEventListener('click', () => {
            // Stop all spinning
            spinControllers.forEach(ctrl => ctrl.stopSpinning());
            // Reset counters to 0 for all slot machines
            slotMachines.forEach((slotMachine) => {
                const counter = slotMachine.querySelector('.counter p');
                if (counter) counter.innerHTML = 'Spins: <b>0</b> ';
            });
            // quick pause, then restart
            setTimeout(() => {
                spinControllers.forEach(ctrl => ctrl.startSpinning());
                // Hide the button again after restart
                resetBtn.style.display = 'none';
            }, 2200);
        });
    }

    slotMachines.forEach((slotMachine, machineIdx) => {
        const machineClass = Array.from(slotMachine.classList).find(cls => cls.startsWith('machine_'));
        const slotImage = slotImages[machineClass];

        for (let i = 0; i < 3; i++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            slot.style.backgroundImage = `url(${slotImage})`;
            slotMachine.appendChild(slot);
        }

        const slots = slotMachine.querySelectorAll('.slot');
        let spinCount = 0;
        let spinning = false;
        let stopped = false;

        const counter = slotMachine.querySelector('.counter p');

        function spinSlot(slot) {
            return new Promise(resolve => {
                const randomPosition = Math.floor(Math.random() * positions);
                slot.style.backgroundPositionY = `-${randomPosition * 100}px`;
                setTimeout(() => resolve(randomPosition), 500); // Simulate the time taken to stop the slot
            });
        }

        async function spinSlots() {
            spinning = true;
            stopped = false;
            spinCount = 0;
            counter.innerHTML = `Spins: <b>${spinCount}</b> `;
            while (!stopped) {
                spinCount++;
                counter.innerHTML = `Spins: <b>${spinCount}</b> `;
                const results = [];
                for (const slot of slots) {
                    const result = await spinSlot(slot);
                    results.push(result);
                }
                if (results.every((pos, _, arr) => pos === arr[0])) {
                    counter.innerHTML = `Match after: <b>${spinCount} attempts</b>`;
                    break;
                }
            }
            spinning = false;
            // Check if all slot machines have stopped and found a match
            setTimeout(() => {
                const allStopped = Array.from(slotMachines).every((sm, idx) => {
                    return !spinControllers[idx].isSpinning();
                });
                if (allStopped && resetBtn) {
                    resetBtn.style.display = 'inline-block';
                }
            }, 100); // Small delay to ensure all are done
        }

        // Control functions for external access
        function stopSpinning() {
            stopped = true;
        }
        function startSpinning() {
            if (!spinning) {
                spinSlots();
            }
        }
        // Add isSpinning method to controller
        function isSpinning() {
            return spinning;
        }

        // Expose controls for this slot machine
        spinControllers.push({ stopSpinning, startSpinning, isSpinning });

        // Start spinning initially
        spinSlots();
    });
});
function menuCheck() {
    document.querySelectorAll('.btn_play').forEach(button => {
        button.setAttribute('disabled', 'true');
        button.classList.add('disabled');
    });
}
