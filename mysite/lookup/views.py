from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt



import os
DIRNAME = os.path.abspath(os.path.dirname(__file__))

import sys
sys.path.append(DIRNAME + '/hazina-cainhouston-living_encyclopedia/newV_wikipediaCorpus')
from dict_driver import *


# Create your views here.
@csrf_exempt 
def index(request):
    
    if request.method == 'POST':
        form = (request.POST)

    try:
        corpus_url = form['corpusurl']
    except:
        corpus_url = ''

    try:
        search_term = form['searchterm']
    except:
        search_term = 'test'
    
    # Format is searching articles on Wikipedia
    # article_names should be * to get every URL starting in en.wikipedia.org/wiki/
    # article_names should be __* to get every URL starting in en.wikipedia.org/wiki/__
    #build_corpus("Software_testing*")
    if len(corpus_url) > 0:
        build_corpus(corpus_url)

    if len(search_term) == 0:
        search_term = 'test'

    word, main_defs, alt_words, alt_defs, main_sents, alt_sents, source = connect_webpage(search_term)

    
    context = {
        'word': word,
        'main_defs': main_defs,
        'main_sents': main_sents,
        'alt_words': alt_words,
        'alt_defs': alt_defs,
        'alt_sents': alt_sents,
        'source': source
    }
    
    return render(request, 'index.html', context=context)
