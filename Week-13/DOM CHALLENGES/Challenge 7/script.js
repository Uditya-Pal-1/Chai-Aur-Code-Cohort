const addSectionBtn = document.getElementById('addSectionBtn');
const accordionContainer = document.querySelector('.accordion-container');

let sectionCount = 3; 

addSectionBtn.addEventListener('click', function() {
    sectionCount++; 


    const newItem = document.createElement('div');
    newItem.classList.add('accordion-item');

    const newHeader = document.createElement('button');
    newHeader.classList.add('accordion-header');

    newHeader.innerHTML = `
        <span class="title">Section ${sectionCount}</span>
        <span class="arrow">&#9660;</span>
    `;

    const newContent = document.createElement('div');
    newContent.classList.add('accordion-content');
    newContent.innerHTML = `<p>This is the newly added text for section ${sectionCount}!</p>`;

    newHeader.addEventListener('click', function() {
        const isActive = newItem.classList.contains('active');

        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });


        if (!isActive) {
            newItem.classList.add('active');
        }
    });

    newItem.appendChild(newHeader);
    newItem.appendChild(newContent);
    accordionContainer.appendChild(newItem);
});