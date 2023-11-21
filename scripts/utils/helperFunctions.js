export class HelperFunctions {

        static sumOfLikes(data) {
                let sum = 0;
                data.forEach(element => {
                        sum += element.likes
                });
                return sum
        }
        
}
