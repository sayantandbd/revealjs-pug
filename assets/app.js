function gotoslide(index)
{
    Reveal.slide( index );
}

function find_slide_index(id) {
    let slides_arr = Reveal.getSlides();
    return slides_arr.findIndex(x => x.id === id);
}

function button_click(element)
{
    let id = element.getAttribute('goto');
    let slideindex = find_slide_index(id);
    gotoslide(slideindex);
}