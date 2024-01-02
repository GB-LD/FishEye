export class FiltersMedia {
    constructor(observer) {
        this.$filterBox = document.querySelector('#filtersOptions');
        this.filterOptions = ['Popularité', 'Date', 'Titre'];
        this.currentOption = this.filterOptions[0];
        this.freeOptions = this.displayFiltersOptions();
        this.sorterObserver = observer; 
    }

    displayFiltersOptions() {
        const freeOptions = this.filterOptions.filter(option => option !== this.currentOption); 
        const freeOptionsLi = freeOptions.map(option => `<li class="py-1 border-t-2 border-white cursor-pointer" tabindex="0">${option}</li>`)
        return this.freeOptions = freeOptionsLi.join('');
    }

    updateFilter(filter) {
        const selectedFilter = filter.innerHTML;
        const indexOfSelectedFilter = this.filterOptions.indexOf(selectedFilter);
        this.currentOption = this.filterOptions[indexOfSelectedFilter];
        this.displayFiltersOptions();
    }

    createFiltersMedia() {
        const filterBoxContent = `
        <span class="mr-2">Trier par :</span>
        <div class="bg-old-brick w-40 text-lg font-bold text-white px-4 rounded-t rounded-b relative">
            <button class="w-full py-1.5 flex justify-between items-center justify-between" aria-expanded="false">
                <span class="block" id="filterSelected">${this.currentOption}</span>
                <i class="block fa-solid fa-chevron-up ml-4 transition-rotate duration-200 ease-in-out"></i>
            </button>
            <ul id="filterList" class="z-10 bg-old-brick absolute left-0 right-0 px-4 rounded-t rounded-b hidden opacity-0 transition-opacity duration-200 ease-in-out">
                ${this.freeOptions}
            </ul>
        </div>
        `;

        this.$filterBox.innerHTML = filterBoxContent;
        const filterBtn = this.$filterBox.querySelector('button');
        const filterBtnChevron = filterBtn.querySelector('i');
        const filterList = this.$filterBox.querySelector('#filterList');
        const filterSelected = this.$filterBox.querySelector('#filterSelected');

        const changeFilterBoxStatus = () => {
            filterList.classList.toggle('opacity-0');
            filterList.classList.toggle('hidden');
            filterList.classList.toggle('rounded-t');
            filterBtn.parentElement.classList.toggle('rounded-b');
            filterBtnChevron.classList.toggle('rotate-180');
            filterBtn.getAttribute('aria-expanded') === 'false' ? filterBtn.setAttribute('aria-expanded', 'true') : filterBtn.setAttribute('aria-expanded', 'false');
        }

        filterList.addEventListener('click', (e) => {
            const clickedElement = e.target;
            
            if (clickedElement.tagName === 'LI') {
                this.updateFilter(e.target);
                filterSelected.textContent = this.currentOption;
                filterList.innerHTML = this.freeOptions;
                changeFilterBoxStatus();
                this.sorterObserver.fire(this.currentOption);
            }
        });

        filterList.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
                this.updateFilter(e.target);
                filterSelected.textContent = this.currentOption;
                filterList.innerHTML = this.freeOptions;
                changeFilterBoxStatus();
                this.sorterObserver.fire(this.currentOption);
            }
        });

        filterBtn.addEventListener('click', () => changeFilterBoxStatus());

        return this.$filterBox;
    }
}