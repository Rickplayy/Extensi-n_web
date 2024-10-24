# PALABRAS ANTOSINASTES -------------------------------------------------- 

-Numero de Palabras en esta categoria: 

Cabr
[ón, ona, ones, oncillo]

Pendej
[a,os,ear,itos,as,etes,eo, ita, adas]

Mierd
[a, itas, ero, ón, eros, as]

Coñ
[o, os, azo, azos]

Chinga
[das, r, da, ndo, dera]

Cul
[eros, eras, ear, ero, era, culerito]

Desgraciad
[o, a, os, as]

Mam
[ona, oncillos, ones, onas]

Hijueput
[a, as, ón]

Malparid
[os, a, as]

Idiot
[a, as, ita, ez]

Pinch
[es, e]

Puñet
[ero, a, eros, eras]

Ojet
[es, e]

Perr
[a, as]

Mamahuevo
[s]


const regexAntisonantes = /\b(  
    cabr(ón|ona|ones|oncillo) |  
    pendej(a|os|ear|itos|as|etes|eo|ita|adas) |  
    mierd(a|itas|ero|ón|eros|as) |  
    coñ(o|os|azo|azos) |  
    chinga(da|ndo|r|das|dera) |  
    cul(eros|eras|culerito|ear|ero|era) |  
    desgraciad(o|a|os|as) |  
    mam(ona|oncillos|ones|onas) |  
    hijueput(as|ón) |  
    malparid(os|a|as) |  
    idiot(a|as|ita|ez) |  
    pinch(es|e) |  
    puñet(ero|a|eros|eras) |  
    ojet(es|e) |  
    perr(a|as) |
    mamahuevo(s)?
)\b/gi; 


# PALABRAS DE INDOLE SEXUAL, HOMOFOBICAS --------------------------------

-Numero de Palabras en esta categoria: 

Verg
[a, as, otas, uita]

Jot
[os, itos, olona, erias]

Ram
[era, ero, eras, eros]

Maric
[ón, as, ona, ones, oncillo, onada, mariquita]

Huevos

Cagón
[es, cito]

Put
[o, a, as, os, itos, otes, eros]

Zorr
[a, eros, as, os, o]

Cog
[er, iendo]

Tet
[as, onas, itas, otas]

Chich
[is, otas, ón]

Mujerzu
[ela, elas]

Pit
[o, os]

Puch
[a, as]

Panoch
[a, on, as]

Golf
[a, as]

Prostitut
[a, as]

Cul
[o, os, itos, otes, ón]


const regex_IndoleSexual = /\b(
    verg(a|as|otas|uita) |
    jot(os|itos|olona|erias) |
    ram(era|ero|eras|eros) |
    maric(ón|as|ona|ones|oncillo|onada|mariquita) |
    huevos |
    cagón(es|cito) |
    put(o|a|as|os|itos|otes|eros) |
    zorr(a|eros|as|os|o) |
    cog(er|iendo) |
    tet(as|onas|itas|otas) |
    chich(is|otas|ón) |
    mujerzuela(s)? |
    pito(s)? |
    pucha(s)? |
    panoch(a|ón|as) |
    golfa(s)? |
    prostitut(a|o|as|os)? |
    prostibulo |
    cul(o|os|itos|otes|ón)
)\b/gi;


# PALABRAS DE INDOLE RACISTA / DISCRIMINATORIOS / CLASISTAS --------------------

-Numero de Palabras en esta categoria: 26


Nac
[o, a, os, on, as]

Chair
[o, os, ito, ón]

Poch
[o, os, ita, ón]

Frijoler
[o, a, os, as, ón]

Pueblerin
[o, a, os, as, ón]


const regexIndoleR_D_C = /\b(
    nac(o|a|os|on|as) |
    chair(o|os|ito|ón) |
    poch(o|os|ita|ón) |
    frijol(e|a|os|as|ón) |
    puebler(o|a|os|as|ón)
)\b/gi;
