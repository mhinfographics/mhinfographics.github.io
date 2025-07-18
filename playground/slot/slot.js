document.addEventListener('DOMContentLoaded', () => {
    const slotMachines = document.querySelectorAll('.slot_machine');
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
