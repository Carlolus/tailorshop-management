<div component="sortable-list" option:sortable-list:handle-selector=".handle">
    <?php $__currentLoopData = $attachments; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $attachment): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div component="ajax-delete-row"
             option:ajax-delete-row:url="<?php echo e(url('/attachments/' . $attachment->id)); ?>"
             data-id="<?php echo e($attachment->id); ?>"
             data-drag-content="<?php echo e(json_encode(['text/html' => $attachment->htmlLink(), 'text/plain' => $attachment->markdownLink()])); ?>"
             class="card drag-card">
            <div class="handle"><?php echo icon('grip'); ?></div>
            <div class="py-s">
                <a href="<?php echo e($attachment->getUrl()); ?>" target="_blank" rel="noopener"><?php echo e($attachment->name); ?></a>
            </div>
            <div class="flex-fill justify-flex-end">
                <button component="event-emit-select"
                        option:event-emit-select:name="insert"
                        type="button"
                        title="<?php echo e(trans('entities.attachments_insert_link')); ?>"
                        class="drag-card-action text-center text-primary"><?php echo icon('link'); ?>                 </button>
                <button component="event-emit-select"
                        option:event-emit-select:name="edit"
                        option:event-emit-select:id="<?php echo e($attachment->id); ?>"
                        type="button"
                        title="<?php echo e(trans('common.edit')); ?>"
                        class="drag-card-action text-center text-primary"><?php echo icon('edit'); ?></button>
                <div component="dropdown" class="flex-fill relative">
                    <button refs="dropdown@toggle"
                            type="button"
                            title="<?php echo e(trans('common.delete')); ?>"
                            class="drag-card-action text-center text-neg"><?php echo icon('close'); ?></button>
                    <div refs="dropdown@menu" class="dropdown-menu">
                        <p class="text-neg small px-m mb-xs"><?php echo e(trans('entities.attachments_delete')); ?></p>
                        <button refs="ajax-delete-row@delete" type="button" class="text-primary small delete text-item"><?php echo e(trans('common.confirm')); ?></button>
                    </div>
                </div>
            </div>
        </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <?php if(count($attachments) === 0): ?>
        <p class="small text-muted">
            <?php echo e(trans('entities.attachments_no_files')); ?>

        </p>
    <?php endif; ?>
</div><?php /**PATH /var/www/bookstack/resources/views/attachments/manager-list.blade.php ENDPATH**/ ?>