import { Component, OnInit } from '@angular/core';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scraper',
  templateUrl: './scraper.page.html',
  styleUrls: ['./scraper.page.scss'],
})
export class ScraperPage implements OnInit {
  receiver:any[];
  viewItems:any[];
  constructor(
    private router:Router
  ) { 

  }
   urls = [
    "https://www.allrecipes.com/recipe/21391/garlic-mashed-potatoes-secret-recipe/",
    "https://www.allrecipes.com/recipe/14685/slow-cooker-beef-stew-i/",
    "https://www.allrecipes.com/recipe/276723/roasted-brussels-sprouts-with-parmesan/",
    "https://www.allrecipes.com/recipe/279722/loaded-overnight-breakfast-casserole/",
    "https://www.allrecipes.com/recipe/229150/cheesy-amish-breakfast-casserole/",
    "https://www.allrecipes.com/recipe/241925/super-easy-egg-casserole/",
    "https://www.allrecipes.com/recipe/221988/eggs-benedict-casserole/",
    "https://www.allrecipes.com/recipe/221259/best-oven-baked-french-toast/",
    "https://www.allrecipes.com/recipe/269758/mediterranean-chicken-medley-with-eggplant-and-feta/",
    "https://www.allrecipes.com/recipe/269707/mushroom-broccoli-and-cheese-stuffed-chicken/",
    "https://www.allrecipes.com/recipe/270211/piri-piri-chicken/",
    "https://www.allrecipes.com/recipe/61024/asian-orange-chicken/",
    "https://www.allrecipes.com/recipe/223042/chicken-parmesan/",
    "https://www.allrecipes.com/recipe/220751/quick-chicken-piccata/",
    "https://www.allrecipes.com/recipe/79159/indian-spiced-rice-treats/",
    "https://www.allrecipes.com/recipe/246969/indian-style-chettinad-chicken/",
    "https://www.allrecipes.com/recipe/276153/crispy-indian-okra/",
    "https://www.allrecipes.com/recipe/276149/indian-chicken-saag/",
    "https://www.allrecipes.com/recipe/236571/indian-pizza/",
    "https://www.allrecipes.com/recipe/212722/murgh-makhani-indian-butter-chicken/",
    "https://www.allrecipes.com/recipe/162901/south-indian-lentil-kootu/",
    "https://www.allrecipes.com/recipe/256598/shahi-tukray-indian-bread-pudding/",
    "https://www.allrecipes.com/recipe/246738/baked-gulab-jamun-indian-dumplings-in-syrup/",
    "https://www.allrecipes.com/recipe/272390/indian-masala-chicken-wings/",
    "https://www.allrecipes.com/recipe/75087/spicy-indian-gujarati-green-beans/",
    "https://www.allrecipes.com/recipe/221791/sambar-spicy-indian-curry/",
    "https://www.allrecipes.com/recipe/24709/indian-saffron-rice/",
    "https://www.allrecipes.com/recipe/267854/super-easy-indian-coconut-ladoo/",
    "https://www.allrecipes.com/recipe/218505/sarson-ka-saag-indian-mustard-greens/",
    "https://www.allrecipes.com/recipe/262717/indian-chole-aloo-tikki/",
    "https://www.allrecipes.com/recipe/50347/indian-tandoori-chicken/",
    "https://www.allrecipes.com/recipe/183664/mango-mint-lassi-with-indian-sweet-spices/",
    "https://www.allrecipes.com/recipe/155060/indian-chai-hot-chocolate/",
    "https://www.allrecipes.com/recipe/83352/indian-mustard-fish/",
    "https://www.allrecipes.com/recipe/147210/dosas-indian-style-pancakes/",
    "https://www.allrecipes.com/recipe/91858/north-indian-nepali-curry-dumplings/"
];

 scrape = async() => {

    const browser = await puppeteer.launch();


    for (const [index, url] of this.urls.entries()) {


        const page = await browser.newPage();


        if (index > 0) await page.waitForTimeout(60 * 1000);


        await page.goto(`${url}`, {
            waitUntil: "networkidle2",
            timeout: 60 * 1000,
        });


        await page.waitForSelector(".recipe-container h1");

        const data1 = await page.evaluate(() => {
            const tds = Array.from(document.querySelectorAll('.ingredients-section__fieldset ul li'))
            return tds.map(td => td.textContent)
        });



        await page.evaluate(() =>
            ({
                title: document.querySelector("h1").innerText,
                Instructions: document.querySelector(".instructions-section p").innerHTML
            })


        ).then(data => {

            console.log('response', "Ingredients:", data1, data);

            var a = JSON.stringify(data) + "\r\n" + "\r\n" + "\r\n";
            var b = "\r\n" + "Ingredients:" + "\r\n" + data1.toString() + "\r\n" + "\r\n";

            var foodArray = a.split(',');
            var foodArray2 = b.split(',');

            var foodString = foodArray.join("\r\n");
            var foodString1 = foodArray2.join("\r\n");


            fs.appendFile("food.txt", foodString1,(err: any)=>{
                if (err) console.log('error', err);
            });

            fs.appendFile("food.txt", foodString, (err)=> {
                if (err) console.log('error', err);
            });


        }).catch(reason => {

            console.log('error', reason);
        }).finally(async() => {

            await page.close();
        })

    }


    await browser.close();
};
  ngOnInit() {
    this.receiver = JSON.parse(localStorage.getItem("login"));
    if(!this.receiver){
      this.router.navigate(['/login']);
    }
  }

}
