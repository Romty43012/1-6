import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/counterSlice';
import Button from '../components/Button';
import Container from '../components/Container';

export default function CounterPage() {
    const count = useSelector(state => state.count);
    const dispatch = useDispatch();

    return (
        <Container>
            <div className="p-4">
                <h2>Страница счетчика (Redux)</h2>
                <div className="text-center">
                    <h1 className="display-1">{count}</h1>
                    <div className="d-flex gap-2 justify-content-center">
                        <Button onClick={() => dispatch(increment())}>
                            Увеличить (+1)
                        </Button>
                        <Button onClick={() => dispatch(decrement())}>
                            Уменьшить (-1)
                        </Button>
                        <Button onClick={() => dispatch(reset())}>
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

