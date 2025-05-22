<?php
    $selectedSort = (isset($sort) && array_key_exists($sort, $options)) ? $sort : array_keys($options)[0];
    $order = (isset($order) && in_array($order, ['asc', 'desc'])) ? $order : 'asc';
?>
<div class="list-sort-container" list-sort-control>
    <div class="list-sort-label"><?php echo e(trans('common.sort')); ?></div>
    <form action="<?php echo e(url("/settings/users/". user()->id ."/change-sort/{$type}")); ?>" method="post">

        <?php echo csrf_field(); ?>

        <?php echo method_field('PATCH'); ?>

        <input type="hidden" value="<?php echo e($selectedSort); ?>" name="sort">
        <input type="hidden" value="<?php echo e($order); ?>" name="order">

        <div class="list-sort">
            <div component="dropdown" class="list-sort-type dropdown-container">
                <div refs="dropdown@toggle" aria-haspopup="true" aria-expanded="false" aria-label="<?php echo e(trans('common.sort_options')); ?>" tabindex="0"><?php echo e($options[$selectedSort]); ?></div>
                <ul refs="dropdown@menu" class="dropdown-menu">
                    <?php $__currentLoopData = $options; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $label): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <li <?php if($key === $selectedSort): ?> class="active" <?php endif; ?>><a href="#" data-sort-value="<?php echo e($key); ?>" class="text-item"><?php echo e($label); ?></a></li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </ul>
            </div>
            <button href="#" class="list-sort-dir" type="button" data-sort-dir
                    aria-label="<?php echo e(trans('common.sort_direction_toggle')); ?> - <?php echo e($order === 'asc' ? trans('common.sort_ascending') : trans('common.sort_descending')); ?>" tabindex="0">
                <?php echo icon($order === 'desc' ? 'sort-up' : 'sort-down'); ?>
            </button>
        </div>
    </form>
</div><?php /**PATH /var/www/bookstack/resources/views/entities/sort.blade.php ENDPATH**/ ?>