<script>
    import { useWindowSize } from './useWindowSize';
    const size = useWindowSize();
</script>
<h1>{$size.width} {$size.height}</h1>