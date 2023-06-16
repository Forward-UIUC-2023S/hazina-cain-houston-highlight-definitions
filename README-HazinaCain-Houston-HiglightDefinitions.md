# Highlight Definitions

## Overview

This code can scrape Wikipedia articles for sentences and save them in a search index powered by Whoosh. 
The user can then search a word an retrieve definitions, sourced either from the internal search index or from Google search results.

## Setup

1. Install Python 3.8.10
2. Install pip 23.1.2
3. In "hazina-cain-houston-highlight-definitions/mysite" folder, run the following:
```
pip install -r requirements.txt
```
4. In "mysite" folder from above, run the following:
```
python3 manage.py runserver 8000
```
You may replace "8000" with a different port of your choice.
5. In a web browser, navigate to:
```
localhost:8000/lookup
```
You may need to change "8000" to the port assigned in Step 4.

Repo file structure:
```
hazina-cain-houston-highlight-definitions/
    - requirements.txt
    - README-HazinaCain-Houston-HiglightDefinitions.md
    - mysite/
        -- manage.py
        -- lookup/
            -- admin.py
            -- apps.py
            -- index.html
            -- __init__.py
            -- models.py
            -- tests.py
            -- urls.py
            -- views.py
            -- hazina-cainhouston-living_encyclopedia/
                -- newV_wikipediaCorpus/
                    -- common_crawl_helper_fns.py
                    -- constructors.py
                    -- dict_driver.py
                    -- text_analysis_helper_fns.py
                    -- results/
        -- mysite/
            -- asgi.py
            -- __init__.py
            -- settings.py
            -- urls.py
            -- wsgi.py
        -- static/
            -- lookup/
                -- hilite.css
                -- hilite.js

This code finds definitions of user-supplied terms from a user-created corpus made of sentences scraped from English Wikipedia.
```


### Important 
Google backup is located here: [HazinaCain-Houston-HighlightDefinitions](https://drive.google.com/file/d/15hcpdyszl-uOJHzPsK8ccralZK_bOFu-/view?usp=share_link)



## Functional Design (Usage)
* Takes as input the URL-formatted version of the Wikipedia page(s) to scrape for sentences.
Sentences will be stored in the user's internal search index.
The text box is labeled:
```
Index:
```

* Takes as input the word to search for and try to define.
The text box is labeled:
```
Search
```


## Demo video
A demo video is located [here](https://drive.google.com/file/d/1PqYTD9PPIu9duVjsF5Xk4swMjbOIluIn/view?usp=share_link).

## Final report
The final report describing this project is located [here](https://docs.google.com/document/d/1_M5KyQa4NnHKVzXZ_vfnwmaCThRpIHZk/edit?usp=share_link&ouid=115901294391800186181&rtpof=true&sd=true).


## Algorithmic Design
This code consists of two parts. They may be run separately.

1. Build sentence corpus
The user may create or add to an internal sentence corpus scraped from Wikipedia pages.
Sentences found in this way have their subjects separated using spaCy, then are archived with the subject as the key.

2. Search for a word
The user may search for a definition of a word.
The first place to look is the internal sentence corpus. 
Words that appear in the subject of sentences in the corpus will be defined according to the format "[WORD] is [DEFINITION]", if possible.
If no sentences match this format and contain the word in the subject, the second place to look for a definition is Google search results.
If no sentences match the format above from Google results, then the user will be notified that no definitions were found.

![design architecture](https://github.com/Forward-UIUC-2023S/hazina-cain-houston-highlight-definitions/project-design.png)
![design architecture](https://github.com/Forward-UIUC-2023S/hazina-cain-houston-highlight-definitions/blob/main/project-design.png)


## Issues and Future Work

* Occasionally words that return results from the internal corpus will make the results section disappear.
* Handling of multi-word phrases can be improved.


## Change log

Spring 2023 (Hazina Cain-Houston)
* Week of 05/14/2023: added function for user-controlled corpus building


## References 
* Dataset: https://en.wikipedia.org/wiki/Main_Page
