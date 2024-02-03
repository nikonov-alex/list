// ----- BASIC LIST IMPLEMENTATION -----
type EmptyList = null;
const EMPTY_LIST = null;

type List<A> =
    EmptyList |
    {
        first: A,
        rest: List<A>
    };

const cons = <A>( first: A, rest: List<A> ): List<A> =>
    ( {  first, rest } );

const isEmpty = ( value: unknown ): value is EmptyList =>
    EMPTY_LIST === value;

const isCons = <A>( value: unknown, valuePredicate: { (v: unknown): v is A } ): value is List<A> =>
    typeof value === "object" && value !== null &&
    "first" in value && "rest" in value &&
    valuePredicate( value.first ) &&
    ( isCons( value.rest, valuePredicate ) || isEmpty( value.rest ) );




// ----- HELPER CONSTRUCTOR -----
 const list = <A>( ... args: A[] ): List<A> =>
     args.reduce( ( rest, first ) => cons( first, rest ), EMPTY_LIST as List<A>);




// ----- ABSTRACTIONS -----
 const fold = <A, B>(
     list: List<A>,
     combine: { ( first: A, result: B ): B },
     initialValue: B
 ): B =>
     isEmpty( list )
        ? initialValue
     : combine(
         list.first,
         fold( list.rest, combine, initialValue )
     );

 const map = <A, B>(
     list: List<A>,
     func: { ( value: A ): B }
): List<B> => fold(
    list,
    ( first: A, mappedRest: List<B> ): List<B> =>
        cons( func( first ), mappedRest ),
    EMPTY_LIST
 );

 const filter = <A>(
     list: List<A>,
     predicate: { ( value: A ): boolean }
 ): List<A> => fold(
     list,
     ( first: A, filteredRest: List<A> ): List<A> =>
        predicate( first )
            ? cons( first, filteredRest )
            : filteredRest,
     EMPTY_LIST
 );




 // ----- ADDITIONAL FUNCTIONS -----
 const concat = <A>( a: List<A>, b: List<A> ): List<A> =>
     fold( a, cons, b );

 const prepend = <A>( l: List<A>, value: A ): List<A> =>
     concat( l, list( value ) );

 const reverse = <A>( list: List<A> ): List<A> =>
     fold(
         list,
         ( first: A, reversedRest: List<A> ): List<A> =>
            prepend( reversedRest, first ),
         EMPTY_LIST
     );




 export { EmptyList, EMPTY_LIST, List, cons, isEmpty, isCons, list, fold, map, filter, concat, prepend, reverse }