document.addEventListener('DOMContentLoaded', () => {
    const slotMachines = document.querySelectorAll('.slot_machine');
    const slotImages = {
        'machine_1': 'img/slot01.jpg',
        'machine_2': 'img/slot02.jpg',
        'machine_3': 'img/slot03.jpg'
    };
    const positions = 12; // Number of positions for each image

    slotMachines.forEach((slotMachine) => {
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

        const counter = slotMachine.querySelector('.counter p');

        function spinSlot(slot) {
            return new Promise(resolve => {
                const randomPosition = Math.floor(Math.random() * positions);
                slot.style.backgroundPositionY = `-${randomPosition * 100}px`;
                setTimeout(() => resolve(randomPosition), 500); // Simulate the time taken to stop the slot
            });
        }

        async function spinSlots() {
            spinCount++;
            counter.innerHTML = `Spins: <b>${spinCount}</b> `;

            const results = [];
            for (const slot of slots) {
                const result = await spinSlot(slot);
                results.push(result);
            }

            if (results.every((pos, _, arr) => pos === arr[0])) {
                counter.innerHTML = `Match after: <b>${spinCount} attempts</b>`;
            } else {
                spinSlots();
            }
        }

        spinSlots();
    });
});