import PropTypes from 'prop-types';



function FilterBar({tipos, tipoActivo, onSeleccionar}){
    return(
        <>

        </>
    )
}
/**
 * Estructura proptypes
 * nombre componente/ funcion, .proptypes, contenido
 */
FilterBar.propTypes ={
    tipos : PropTypes.arrayOf(PropTypes.string).isRequired,
    tipoActivo : PropTypes.string.isRequired,
    onSeleccionar : PropTypes.func.isRequired,

}

export default FilterBar;

