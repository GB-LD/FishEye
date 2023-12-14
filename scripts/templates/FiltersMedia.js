export class FiltersMedia {
    constructor() {
        this.$filterBox = document.querySelector('#filtersOptions');
        this.filterOptions = ['Popularité', 'Date', 'Titre'];
        this.currentOption = this.filterOptions[0];
    }

    displayFiltersOptions() {
        const freeOptions = this.filterOptions.filter(option => option !== this.currentOption); 
        const freeOptionsLi = freeOptions.map(option => `<li class="py-1 border-b border-white cursor-pointer">${option}</li>`) 
        return freeOptionsLi
    }

    updateFilter(e = null) {
        if (e && e.currentTarget) {
            const selectedFilter = e.currentTarget.innerHTML;
            const indexOfSelectedFilter = this.filterOptions.indexOf(selectedFilter);
            console.log('helloe');
            return this.currentOption = this.filterOptions[indexOfSelectedFilter];     
        } else {
            return this.currentOption = this.filterOptions[0];
        }
    }

    createFiltersMedia() {
        const filterBoxContent = `
        <div class="bg-old-brick w-fit text-lg font-bold text-white px-4 rounded relative">
            <button class="py-1 flex items-center">
                <span>${this.updateFilter()}</span>
                <i class="fa-solid fa-chevron-up ml-4  transition-rotate duration-200 ease-in-out"></i>
            </button>
            <ul id="filterList" class="bg-old-brick absolute left-0 right-0 px-4 rounded opacity-0 transition-opacity duration-200 ease-in-out">
                ${this.displayFiltersOptions().join('')}
            </ul>
        </div>
        `;

        this.$filterBox.innerHTML = filterBoxContent;
        const filterBtn = this.$filterBox.querySelector('button');
        const filterBtnChevron = filterBtn.querySelector('i');
        const filterList = this.$filterBox.querySelector('#filterList');

        filterList.querySelectorAll('li').forEach(li => li.addEventListener('click', (e) => this.updateFilter(e)));

        filterBtn.addEventListener('click', () => {
            filterList.classList.toggle('opacity-0');
            filterBtnChevron.classList.toggle('rotate-180')
        });



        console.log(this.displayFiltersOptions());
        return this.$filterBox;
    }
}